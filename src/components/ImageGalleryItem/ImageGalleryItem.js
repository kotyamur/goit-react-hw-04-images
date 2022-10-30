import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { ImageBox, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = forwardRef(({ image }, ref) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL, tags, largeImageURL } = image;

  return (
    <>
      <ImageBox onClick={toggleModal} ref={ref}>
        <GalleryItemImage src={webformatURL} alt={tags} loading="lazy" />
      </ImageBox>
      {showModal && (
        <Modal onClose={toggleModal} largeImg={largeImageURL} alt={tags} />
      )}
    </>
  );
});

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
