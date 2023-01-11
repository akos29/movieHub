/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imdbAPI from '../../apis/imdbAPI';

const initialState = {
  boxOffice: [],
  status: 'idle',
  searchResults: [],
};

export const getBoxOffice = createAsyncThunk(
  'boxOffice/fetchBoxOffice',
  async () => {
    // const response = await imdbAPI.get('/rockets');
    const response = await imdbAPI.get('BoxOffice/k_4a3l84o7');
    console.log(response.data.items);
    return response.data.items;
  },
);

export const boxOfficeSlice = createSlice({
  name: 'boxOffice',
  initialState,
  reducers: {
    fetchByName: (state, action) => {
      [...state.searchResults, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoxOffice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoxOffice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boxOffice = state.boxOffice.concat(action.payload);
      })
      .addCase(getBoxOffice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { getByName } = boxOfficeSlice.actions;

export default boxOfficeSlice.reducer;
