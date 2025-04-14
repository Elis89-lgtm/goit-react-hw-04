import styles from "./ImageCard.module.css";

const ImageCard = ({ src, alt, avg_color, openModal }) => {
  return (
    <div
      className={styles.thumb}
      style={{ backgroundColor: avg_color, borderColor: avg_color }}
    >
      <img
        src={src.small}
        alt={alt}
        onClick={() => openModal(src.regular, alt)}
        className={styles.image}
      />
    </div>
  );
};
export default ImageCard;
