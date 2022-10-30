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
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const fetchedImages = await fetchImagesByName(searchQuery, currentPage);
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setTotalHits(fetchedImages.totalHits);
        if (fetchedImages.totalHits === 0) {
          setError('Sorry, there are no images matching your search query.');
        }
      } catch (e) {
        setError('Ops, failed to load. Please try again.');
        throw e;
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchImages();
    }
  }, [searchQuery, currentPage]);

  const shouldLoadMoreShown = !isLoading && images.length < totalHits;

  const handleSubmit = query => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setCurrentPage(1);
      setError('');
      setImages([]);
      setTotalHits(null);
    }
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
      {shouldLoadMoreShown && <Button onClick={handleClickOnLoadBtn} />}
    </Layout>
  );
};
