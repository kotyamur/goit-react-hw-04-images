import { Component } from 'react';
import { fetchImagesByName } from '../api';
import { Layout, ErrorMessage } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    page: null,
    error: '',
    images: [],
    isLoading: false,
    isLoadMoreShown: false,
  };

  componentDidMount() {
    if (this.state.isLoading) {
      this.fetchImages();
    }
  }

  componentDidUpdate() {
    if (this.state.isLoading) {
      this.fetchImages();
    }
  }

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  fetchImages = async () => {
    const searchQuery = this.state.searchQuery;
    const searchPage = this.state.page;
    try {
      const fetchedImages = await fetchImagesByName(searchQuery, searchPage);
      const images = [...this.state.images, ...fetchedImages.hits];
      this.setState({
        images: images,
        isLoadMoreShown: images.length < fetchedImages.totalHits,
        error:
          images.length === 0
            ? 'Sorry, there are no images matching your search query.'
            : '',
      });
    } catch {
      this.setState({
        error: 'Ops, failed to load. Please try again.',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      images: [],
      page: 1,
      isLoading: true,
    });
  };

  handleClickOnLoadBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  render() {
    const { isLoading, images, error, isLoadMoreShown, searchQuery } =
      this.state;
    return (
      <Layout>
        <Searchbar
          onSubmit={this.handleSubmit}
          inputValue={searchQuery}
          onChange={this.handleChange}
        />
        <Loader isLoading={isLoading} />
        {images.length > 0 && <ImageGallery images={images} />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!isLoading && isLoadMoreShown && (
          <Button onClick={this.handleClickOnLoadBtn} />
        )}
      </Layout>
    );
  }
}
