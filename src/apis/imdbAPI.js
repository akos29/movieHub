import axios from 'axios';

export default axios.create({
  baseURL: 'https://imdb-api.com/en/API',
});
