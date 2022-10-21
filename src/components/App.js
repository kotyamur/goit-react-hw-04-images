import { Component } from 'react';
import { fetchImagesByName } from '../api';
import { Layout } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    error: null,
  };

  componentDidMount() {
    console.log('DidMount');
  }

  componentDidUpdate() {
    console.log('didUpdate');
  }

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
    console.log(e.currentTarget.value);
  };

  fetchImages = async searchQuery => {
    const searchPage = this.state.page;
    try {
      const images = await fetchImagesByName(searchQuery, searchPage);
      console.log(images);
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
    this.fetchImages(this.state.searchQuery);
  };

  render() {
    return (
      <Layout>
        <Searchbar
          onSubmit={this.handleSubmit}
          inputValue={this.state.searchQuery}
          onChange={this.handleChange}
        />
        <div></div>
        <button type="button">Load more</button>
      </Layout>
    );
  }
}
