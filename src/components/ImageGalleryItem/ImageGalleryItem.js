import PropTypes from 'prop-types';
// import { useState, forwardRef } from 'react';
import { useState, useRef, useEffect } from 'react';
import { ImageBox, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import { scrollToElement } from 'utilities';

export const ImageGalleryItem = ({ image, isScrollAnchor = false }) => {
  const [showModal, setShowModal] = useState(false);

  const itemRef = useRef(null);

  useEffect(() => {
    if (!itemRef.current) return;

    scrollToElement(itemRef.current, 90);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL, tags, largeImageURL } = image;

  return (
    <>
      <ImageBox onClick={toggleModal} ref={isScrollAnchor ? itemRef : null}>
        <GalleryItemImage src={webformatURL} alt={tags} loading="lazy" />
      </ImageBox>
      {showModal && (
        <Modal onClose={toggleModal} largeImg={largeImageURL} alt={tags} />
      )}
    </>
  );
};

// export const ImageGalleryItem = forwardRef(({ image }, ref) => {
//   const [showModal, setShowModal] = useState(false);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   const { webformatURL, tags, largeImageURL } = image;

//   return (
//     <>
//       <ImageBox onClick={toggleModal} ref={ref}>
//         <GalleryItemImage src={webformatURL} alt={tags} loading="lazy" />
//       </ImageBox>
//       {showModal && (
//         <Modal onClose={toggleModal} largeImg={largeImageURL} alt={tags} />
//       )}
//     </>
//   );
// });

ImageGalleryItem.propTypes = {
  isScrollAnchor: PropTypes.bool,
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
