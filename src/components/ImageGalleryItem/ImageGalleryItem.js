import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageBox, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      image: { webformatURL, tags, largeImageURL },
    } = this.props;

    return (
      <>
        <ImageBox onClick={this.toggleModal}>
          <GalleryItemImage src={webformatURL} alt={tags} loading="lazy" />
        </ImageBox>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImg={largeImageURL}
            alt={tags}
          />
        )}
      </>
    );
  }
}
