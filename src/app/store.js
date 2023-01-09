import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
