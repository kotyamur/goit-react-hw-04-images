import { Component } from 'react';
import { fetchImagesByName } from '../api';
import { Layout } from './App.styled';
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

  componentDidUpdate(_, prevState) {
    console.log(this.state);
    // const isLoadMoreClicked = prevState.page !== this.state.page;
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
      // this.setState({ isLoading: true });
      const fetchedImages = await fetchImagesByName(searchQuery, searchPage);
      const images = [...this.state.images, ...fetchedImages.hits];
      this.setState({
        images: images,
        isLoadMoreShown: images.length < fetchedImages.totalHits,
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
    return (
      <Layout>
        <Searchbar
          onSubmit={this.handleSubmit}
          inputValue={this.state.searchQuery}
          onChange={this.handleChange}
        />
        <Loader isLoading={this.state.isLoading} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        {this.state.error && <div>{this.state.error}</div>}
        {!this.state.isLoading && this.state.isLoadMoreShown && (
          <Button onClick={this.handleClickOnLoadBtn} />
        )}
      </Layout>
    );
  }
}
