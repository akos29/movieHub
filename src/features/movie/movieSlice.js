/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imdbAPI from '../../apis/imdbAPI';

const initialState = {
  movies: [],
  status: 'idle',
  searchResults: [],
};

export const getMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await imdbAPI.get('/rockets');
    // const response = await imdbAPI.get('Top250Movies/k_4a3l84o7');
    console.log(response.data);
    return response.data;
  },
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchByName: (state, action) => {
      [...state.searchResults, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = state.movies.concat(action.payload);
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { getByName } = movieSlice.actions;

export const selectMovies = (state) => state.movies;

export default movieSlice.reducer;
