import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  const itemRef = useRef();

  useEffect(() => {
    if (images.length < 13) {
      return;
    }
    window.scrollBy({
      top: itemRef.current.clientHeight * 2,
      behavior: 'smooth',
    });
  }, [images.length]);

  return (
    <Layout>
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} ref={itemRef} />;
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
