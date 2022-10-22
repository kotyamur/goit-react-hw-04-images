import { Layout } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <Layout>
      {images.map(({ id, webformatURL, tags }) => {
        return <ImageGalleryItem key={id} image={webformatURL} tags={tags} />;
      })}
    </Layout>
  );
};
