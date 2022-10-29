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
  // const [isLoadMoreShown, setIsLoadMoreShown] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    // if (searchQuery === '' || !isLoading) {
    //   return;
    // }
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const fetchedImages = await fetchImagesByName(searchQuery, currentPage);
        console.log(fetchedImages);
        console.log(fetchedImages.totalHits);
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setTotalHits(fetchedImages.totalHits);
        // setIsLoadMoreShown(
        //   images.length + fetchedImages.hits.length < fetchedImages.totalHits
        // );
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

  // const handleChange = e => {
  //   setSearchQuery(e.currentTarget.value);
  // };

  const handleSubmit = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setTotalHits(null);
    // setIsLoading(true);
  };

  const handleClickOnLoadBtn = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    // setIsLoading(true);
  };

  return (
    <Layout>
      <Searchbar
        onSubmit={handleSubmit}
        // inputValue={searchQuery}
        // onChange={handleChange}
      />
      {images.length > 0 && <ImageGallery images={images} />}
      <Loader isLoading={isLoading} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* {!isLoading && isLoadMoreShown && (
        <Button onClick={handleClickOnLoadBtn} />
      )} */}
      {!isLoading && shouldLoadMoreShown && (
        <Button onClick={handleClickOnLoadBtn} />
      )}
    </Layout>
  );
};
