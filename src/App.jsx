import "./App.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { getPhotos } from "./apiService/photos.js";
import Loader from "./components/Loader/Loader.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { photos, per_page, total_results } = await getPhotos(
          query,
          page
        );
        if (!photos.length) {
          setIsEmpty(true);
          return;
        }
        setImages((prev) => [...prev, ...photos]); // prevImages===images
        const totalPages = Math.ceil(total_results / per_page);
        setIsVisible(page < totalPages);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);
  const onHandleSubmit = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };
  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setModalSrc("");
    setModalAlt("");
  };
  const openModal = (Src, Alt) => {
    setModalIsOpen(true);
    setModalSrc(Src);
    setModalAlt(Alt);
  };
  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {!error && !isEmpty && !images.length && (
        <p style={{ textAlign: "center" }}>Let`s begin search 🔎</p>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isVisible && images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? "Loading.." : "Load More"}
        </LoadMoreBtn>
      )}
      {isEmpty && (
        <p style={{ textAlign: "center" }}>Sorry, but we dont found image 🔎</p>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};

export default App;
