import { Component } from 'react';
import { fetchImagesByName } from '../api';
import { Layout } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    error: null,
    images: [],
  };

  componentDidMount() {
    console.log('DidMount');
  }

  componentDidUpdate(_, prevState) {
    console.log('didUpdate');
    console.log(prevState.page);
    console.log(this.state.page);
    if (
      prevState.page !== this.state.page &&
      prevState.searchQuery === this.state.searchQuery
    ) {
      this.fetchImages();
    }
  }

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
    console.log(e.currentTarget.value);
    this.setState({ images: [] });
    this.setState({ page: 1 });
  };

  fetchImages = async () => {
    const searchQuery = this.state.searchQuery;
    const searchPage = this.state.page;
    try {
      const images = await fetchImagesByName(searchQuery, searchPage);
      console.log(images.hits);
      this.setState(prevState => {
        return {
          images: prevState.images.concat(images.hits),
        };
      });
    } catch {
      this.setState({
        error: 'Ops, failed to load. Please try again. ',
      });
    } finally {
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log('submit');

    this.fetchImages();
  };

  handleClickOnLoadBtn = () => {
    console.log('Click');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <Layout>
        <Searchbar
          onSubmit={this.handleSubmit}
          inputValue={this.state.searchQuery}
          onChange={this.handleChange}
        />
        <ImageGallery images={this.state.images} />
        <Button onClick={this.handleClickOnLoadBtn} />
      </Layout>
    );
  }
}
