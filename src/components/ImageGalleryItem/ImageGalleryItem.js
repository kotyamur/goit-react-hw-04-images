import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { ImageBox, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ image, images }) => {
  const [showModal, setShowModal] = useState(false);

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL, tags, largeImageURL } = image;

  return (
    <>
      <ImageBox onClick={toggleModal} ref={itemRef}>
        <GalleryItemImage src={webformatURL} alt={tags} loading="lazy" />
      </ImageBox>
      {showModal && (
        <Modal onClose={toggleModal} largeImg={largeImageURL} alt={tags} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
