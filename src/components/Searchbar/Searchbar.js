import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleInputSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <Layout>
      <SearchForm onSubmit={handleInputSubmit}>
        <SearchFormBtn type="submit">
          <BiSearch size="24" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Layout>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // inputValue: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired,
};
