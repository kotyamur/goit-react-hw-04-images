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
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const fetchedImages = await fetchImagesByName(searchQuery, currentPage);
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setTotalHits(fetchedImages.totalHits);
      } catch (e) {
        setError('Ops, failed to load. Please try again.');
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [searchQuery, currentPage]);

  const shouldLoadMoreShown = images.length < totalHits;

  useEffect(() => {
    if (totalHits === null) {
      return;
    }
    setError(
      totalHits === 0
        ? 'Sorry, there are no images matching your search query.'
        : ''
    );
  }, [totalHits]);

  const handleSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setTotalHits(null);
  };

  const handleClickOnLoadBtn = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      <Loader isLoading={isLoading} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!isLoading && shouldLoadMoreShown && (
        <Button onClick={handleClickOnLoadBtn} />
      )}
    </Layout>
  );
};
