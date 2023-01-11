/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imdbAPI from '../../apis/imdbAPI';

const initialState = {
  boxOfficeAllTime: [],
  status: 'idle',
  searchResults: [],
};

export const getBoxOfficeAllTime = createAsyncThunk(
  'boxOfficeAllTime/fetchBoxOfficeAllTime',
  async () => {
    // const response = await imdbAPI.get('/rockets');
    const response = await imdbAPI.get(`BoxOfficeAllTime/${process.env.REACT_APP_API_KEY}`);
    console.log(response.data.items);
    return response.data.items;
  },
);

export const boxOfficeAllTimeSlice = createSlice({
  name: 'boxOfficeAllTime',
  initialState,
  reducers: {
    fetchByName: (state, action) => {
      [...state.searchResults, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoxOfficeAllTime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoxOfficeAllTime.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boxOfficeAllTime = state.boxOfficeAllTime.concat(action.payload);
      })
      .addCase(getBoxOfficeAllTime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { getByName } = boxOfficeAllTimeSlice.actions;

export default boxOfficeAllTimeSlice.reducer;
