import { Component } from 'react';
import axios from 'axios';

const API_KEY = '29796750-ac01510cc804ce1d65455fcc5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            placeholder="Search images and photos..."
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
        <div></div>
        <button type="button">Load more</button>
      </div>
    );
  }
}
