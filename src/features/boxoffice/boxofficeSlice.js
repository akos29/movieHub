/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imdbAPI from '../../apis/imdbAPI';

const initialState = {
  boxOffice: [{
    "id": "tt1630029",
    "rank": "1",
    "title": "Avatar: The Way of Water",
    "image": "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$45.8M",
    "gross": "$517.6M",
    "weeks": "4"
},
{
    "id": "tt8760708",
    "rank": "2",
    "title": "M3GAN",
    "image": "https://m.media-amazon.com/images/M/MV5BMDk4MTdhYzEtODk3OS00ZDBjLWFhNTQtMDI2ODdjNzQzZTA3XkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$30.4M",
    "gross": "$30.4M",
    "weeks": "1"
},
{
    "id": "tt3915174",
    "rank": "3",
    "title": "Puss in Boots: The Last Wish",
    "image": "https://m.media-amazon.com/images/M/MV5BNjMyMDBjMGUtNDUzZi00N2MwLTg1MjItZTk2MDE1OTZmNTYxXkEyXkFqcGdeQXVyMTQ5NjA0NDM0._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$13.5M",
    "gross": "$88.1M",
    "weeks": "3"
},
{
    "id": "tt7405458",
    "rank": "4",
    "title": "A Man Called Otto",
    "image": "https://m.media-amazon.com/images/M/MV5BNzg3OTEzMTgtYWU0OC00YTI0LWIxOTAtNmRkNTc0Nzg2YWU1XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$4.2M",
    "gross": "$4.3M",
    "weeks": "2"
},
{
    "id": "tt9114286",
    "rank": "5",
    "title": "Black Panther: Wakanda Forever",
    "image": "https://m.media-amazon.com/images/M/MV5BY2FlN2U2NzMtOWE2Ni00MWIyLTk3YzQtM2RjNDFkNTlhYTZmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$3.5M",
    "gross": "$445.6M",
    "weeks": "9"
},
{
    "id": "tt12193804",
    "rank": "6",
    "title": "Whitney Houston: I Wanna Dance with Somebody",
    "image": "https://m.media-amazon.com/images/M/MV5BODY5OGI0MzYtZTdkMi00NjU1LTkzYjAtNDA5M2ZlYjFlODgzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$2.4M",
    "gross": "$19.7M",
    "weeks": "3"
},
{
    "id": "tt13833688",
    "rank": "7",
    "title": "The Whale",
    "image": "https://m.media-amazon.com/images/M/MV5BZDQ4Njg4YTctNGZkYi00NWU1LWI4OTYtNmNjOWMyMjI1NWYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$1.5M",
    "gross": "$8.6M",
    "weeks": "5"
},
{
    "id": "tt10640346",
    "rank": "8",
    "title": "Babylon",
    "image": "https://m.media-amazon.com/images/M/MV5BNjlkYjc4NGMtZjc3MS00NjQ3LTk4MmUtMTkwZGZjODE1ZDVlXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$1.4M",
    "gross": "$13.5M",
    "weeks": "3"
},
{
    "id": "tt12003946",
    "rank": "9",
    "title": "Violent Night",
    "image": "https://m.media-amazon.com/images/M/MV5BYzg2NWNhOWItYjA3Yi00MzhhLTg4ZmItYzM3ZTIwN2U0ZGQ5XkEyXkFqcGdeQXVyMzEyMDQzNzY@._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$707K",
    "gross": "$49.4M",
    "weeks": "6"
},
{
    "id": "tt9764362",
    "rank": "10",
    "title": "The Menu",
    "image": "https://m.media-amazon.com/images/M/MV5BMzdjNjI5MmYtODhiNS00NTcyLWEzZmUtYzVmODM5YzExNDE3XkEyXkFqcGdeQXVyMTAyMjQ3NzQ1._V1_UX128_CR0,12,128,176_AL_.jpg",
    "weekend": "$686K",
    "gross": "$37.6M",
    "weeks": "8"
}],
  status: 'idle',
  searchResults: [],
};

export const getBoxOffice = createAsyncThunk(
  'boxOffice/fetchBoxOffice',
  async () => {
    // const response = await imdbAPI.get('/rockets');
    const response = await imdbAPI.get(`BoxOffice/${process.env.REACT_APP_API_KEY}`);
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
