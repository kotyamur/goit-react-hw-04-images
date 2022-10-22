import { ImageBox, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, tags }) => {
  return (
    <ImageBox>
      <GalleryItemImage src={image} alt={tags} />
    </ImageBox>
  );
};
