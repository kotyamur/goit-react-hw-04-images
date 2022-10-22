import axios from 'axios';

const API_KEY = '29796750-ac01510cc804ce1d65455fcc5';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImagesByName = async (searchQuery, page = 1) => {
  const response = await axios.get('', {
    params: {
      q: searchQuery,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data;
};
