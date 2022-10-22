import { Component } from 'react';
import { ImageBox, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image } = this.props;
    return (
      <>
        <ImageBox onClick={this.toggleModal}>
          <GalleryItemImage
            src={image.webformatURL}
            alt={image.tags}
            loading="lazy"
          />
        </ImageBox>
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImg={image.largeImageURL}
            alt={image.tags}
          />
        )}
      </>
    );
  }
}
