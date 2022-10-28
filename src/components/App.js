import { useState, useEffect } from 'react';
import { fetchImagesByName } from '../api';
import { Layout, ErrorMessage } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(null);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreShown, setIsLoadMoreShown] = useState(false);

  useEffect(() => {
    if (searchQuery === '' || !isLoading) {
      return;
    }
    const fetchImages = async () => {
      try {
        const fetchedImages = await fetchImagesByName(searchQuery, currentPage);
        console.log(fetchedImages);
        console.log(fetchedImages.totalHits);
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setIsLoadMoreShown(
          images.length + fetchedImages.hits.length < fetchedImages.totalHits
        );
        // setError(
        //   images.length === 0
        //     ? 'Sorry, there are no images matching your search query.'
        //     : ''
        // );
      } catch (e) {
        setError('Ops, failed to load. Please try again.');
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [isLoading]);

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setCurrentPage(1);
    setImages([]);
    setIsLoading(true);
  };

  const handleClickOnLoadBtn = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    setIsLoading(true);
  };

  return (
    <Layout>
      <Searchbar
        onSubmit={handleSubmit}
        inputValue={searchQuery}
        onChange={handleChange}
      />
      <Loader isLoading={isLoading} />
      {images.length > 0 && <ImageGallery images={images} />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!isLoading && isLoadMoreShown && (
        <Button onClick={handleClickOnLoadBtn} />
      )}
    </Layout>
  );
};
