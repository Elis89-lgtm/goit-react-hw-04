import axios from "axios";
const API_KEY = "MgGVu-2Aj7GbcWHyEAULVPxtWi0-9yK_brGw5GgXLKI";
const UNSPLASH_URL = "https://api.unsplash.com/search/photos";
const BASE_URL = "https://api.unsplash.com";
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;
axios.defaults.params = {
  orientation: "landscape",
  per_page: 16,
};

export const getPhotos = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      page,
    },
  });

  return {
    photos: response.data.results,
    total_results: response.data.total,
    per_page: 16,
  };
};
