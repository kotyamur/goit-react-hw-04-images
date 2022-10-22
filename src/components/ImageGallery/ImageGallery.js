import PropTypes from 'prop-types';
import { Layout } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <Layout>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </Layout>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
