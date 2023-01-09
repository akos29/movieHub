import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.spacexdata.com/v3',
  // baseURL: 'https://imdb-api.com/en/API',
});

// export default imdbAPI;
