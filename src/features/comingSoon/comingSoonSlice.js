/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imdbAPI from '../../apis/imdbAPI';

const initialState = {
  comingSoon: [],
  status: 'idle',
  searchResults: [],
};

export const getComingSoon = createAsyncThunk(
  'comingSoon/fetchComingSoon',
  async () => {
    // const response = await imdbAPI.get('/rockets');
    const response = await imdbAPI.get(`ComingSoon/${process.env.REACT_APP_API_KEY}`);
    console.log(response.data.items);
    return response.data.items;
  },
);

export const comingSoonSlice = createSlice({
  name: 'comingSoon',
  initialState,
  reducers: {
    fetchByName: (state, action) => {
      [...state.searchResults, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComingSoon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getComingSoon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comingSoon = state.comingSoon.concat(action.payload);
      })
      .addCase(getComingSoon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { getByName } = comingSoonSlice.actions;

export default comingSoonSlice.reducer;
