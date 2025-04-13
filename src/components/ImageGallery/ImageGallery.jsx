import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, openModal }) => {
  return (
    <Grid>
      {images.map(({ id, src, alt, avg_color }) => (
        <GridItem key={id}>
          <ImageCard
            src={src}
            alt={alt}
            avg_color={avg_color}
            openModal={openModal}
          />
        </GridItem>
      ))}
    </Grid>
  );
};
export default ImageGallery;
