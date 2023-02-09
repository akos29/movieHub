/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imdbAPI from '../../apis/imdbAPI';

const initialState = {
  boxOfficeAllTime: [
    {
      "id": "tt0499549",
      "rank": "1",
      "title": "Avatar",
      "worldwideLifetimeGross": "$2,922,917,914",
      "domesticLifetimeGross": "$785,221,649",
      "domestic": "26.9%",
      "foreignLifetimeGross": "$2,137,696,265",
      "foreign": "73.1%",
      "year": "2009"
  },
  {
      "id": "tt4154796",
      "rank": "2",
      "title": "Avengers: Endgame",
      "worldwideLifetimeGross": "$2,797,501,328",
      "domesticLifetimeGross": "$858,373,000",
      "domestic": "30.7%",
      "foreignLifetimeGross": "$1,939,128,328",
      "foreign": "69.3%",
      "year": "2019"
  },
  {
      "id": "tt0120338",
      "rank": "3",
      "title": "Titanic",
      "worldwideLifetimeGross": "$2,201,647,264",
      "domesticLifetimeGross": "$659,363,944",
      "domestic": "30%",
      "foreignLifetimeGross": "$1,542,283,320",
      "foreign": "70%",
      "year": "1997"
  },
  {
      "id": "tt2488496",
      "rank": "4",
      "title": "Star Wars: Episode VII - The Force Awakens",
      "worldwideLifetimeGross": "$2,069,521,700",
      "domesticLifetimeGross": "$936,662,225",
      "domestic": "45.3%",
      "foreignLifetimeGross": "$1,132,859,475",
      "foreign": "54.7%",
      "year": "2015"
  },
  {
      "id": "tt4154756",
      "rank": "5",
      "title": "Avengers: Infinity War",
      "worldwideLifetimeGross": "$2,048,359,754",
      "domesticLifetimeGross": "$678,815,482",
      "domestic": "33.1%",
      "foreignLifetimeGross": "$1,369,544,272",
      "foreign": "66.9%",
      "year": "2018"
  },
  {
      "id": "tt10872600",
      "rank": "6",
      "title": "Spider-Man: No Way Home",
      "worldwideLifetimeGross": "$1,916,306,995",
      "domesticLifetimeGross": "$814,115,070",
      "domestic": "42.5%",
      "foreignLifetimeGross": "$1,102,191,925",
      "foreign": "57.5%",
      "year": "2021"
  },
  {
      "id": "tt1630029",
      "rank": "7",
      "title": "Avatar: The Way of Water",
      "worldwideLifetimeGross": "$1,730,906,779",
      "domesticLifetimeGross": "$521,106,779",
      "domestic": "30.1%",
      "foreignLifetimeGross": "$1,209,800,000",
      "foreign": "69.9%",
      "year": "2022"
  },
  {
      "id": "tt0369610",
      "rank": "8",
      "title": "Jurassic World",
      "worldwideLifetimeGross": "$1,671,537,444",
      "domesticLifetimeGross": "$653,406,625",
      "domestic": "39.1%",
      "foreignLifetimeGross": "$1,018,130,819",
      "foreign": "60.9%",
      "year": "2015"
  },
  {
      "id": "tt6105098",
      "rank": "9",
      "title": "The Lion King",
      "worldwideLifetimeGross": "$1,663,075,401",
      "domesticLifetimeGross": "$543,638,043",
      "domestic": "32.7%",
      "foreignLifetimeGross": "$1,119,437,358",
      "foreign": "67.3%",
      "year": "2019"
  },
  {
      "id": "tt0848228",
      "rank": "10",
      "title": "The Avengers",
      "worldwideLifetimeGross": "$1,518,815,515",
      "domesticLifetimeGross": "$623,357,910",
      "domestic": "41%",
      "foreignLifetimeGross": "$895,457,605",
      "foreign": "59%",
      "year": "2012"
  },
  {
      "id": "tt2820852",
      "rank": "11",
      "title": "Furious 7",
      "worldwideLifetimeGross": "$1,515,341,399",
      "domesticLifetimeGross": "$353,007,020",
      "domestic": "23.3%",
      "foreignLifetimeGross": "$1,162,334,379",
      "foreign": "76.7%",
      "year": "2015"
  },
  {
      "id": "tt1745960",
      "rank": "12",
      "title": "Top Gun: Maverick",
      "worldwideLifetimeGross": "$1,488,732,821",
      "domesticLifetimeGross": "$718,732,821",
      "domestic": "48.3%",
      "foreignLifetimeGross": "$770,000,000",
      "foreign": "51.7%",
      "year": "2022"
  },
  ],
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
