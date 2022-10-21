import { Component } from 'react';
import axios from 'axios';
import { Layout } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';

const API_KEY = '29796750-ac01510cc804ce1d65455fcc5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
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
    try {
      const response = await axios.get('', {
        params: {
          q: searchQuery,
          page: 1,
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      });
      console.log(response);
    } catch {
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
        {/* <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            placeholder="Search images and photos..."
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form> */}
        <div></div>
        <button type="button">Load more</button>
      </Layout>
    );
  }
}
