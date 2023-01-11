/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import imdbAPI from '../../apis/imdbAPI';

const initialState = {
  comingSoon: [
    {
      "id": "tt7405458",
      "title": "A Man Called Otto",
      "fullTitle": "A Man Called Otto (2022)",
      "year": "2022",
      "releaseState": "Jan 13, 2023",
      "image": "https://m.media-amazon.com/images/M/MV5BNzg3OTEzMTgtYWU0OC00YTI0LWIxOTAtNmRkNTc0Nzg2YWU1XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UX128_CR0,12,128,176_AL_.jpg",
      "runtimeMins": null,
      "runtimeStr": null,
      "plot": null,
      "contentRating": null,
      "imDbRating": null,
      "imDbRatingCount": null,
      "metacriticRating": null,
      "genres": "Comedy, Drama",
      "genreList": [
          {
              "key": "Comedy",
              "value": "Comedy"
          },
          {
              "key": "Drama",
              "value": "Drama"
          }
      ],
      "directors": null,
      "directorList": [],
      "stars": "Tom Hanks, John Higgins, Tony Bingham, Lily Kozub",
      "starList": [
          {
              "id": null,
              "name": "Tom Hanks"
          },
          {
              "id": null,
              "name": "John Higgins"
          },
          {
              "id": null,
              "name": "Tony Bingham"
          },
          {
              "id": null,
              "name": "Lily Kozub"
          }
      ]
  },
  {
      "id": "tt5884796",
      "title": "Plane",
      "fullTitle": "Plane (2023)",
      "year": "2023",
      "releaseState": "Jan 13, 2023",
      "image": "https://m.media-amazon.com/images/M/MV5BZDc4MzVkNzYtZTRiZC00ODYwLWJjZmMtMDIyNjQ1M2M1OGM2XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX128_CR0,12,128,176_AL_.jpg",
      "runtimeMins": null,
      "runtimeStr": null,
      "plot": null,
      "contentRating": null,
      "imDbRating": null,
      "imDbRatingCount": null,
      "metacriticRating": null,
      "genres": "Action, Thriller",
      "genreList": [
          {
              "key": "Action",
              "value": "Action"
          },
          {
              "key": "Thriller",
              "value": "Thriller"
          }
      ],
      "directors": null,
      "directorList": [],
      "stars": "Gerard Butler, Mike Colter, Yoson An, Daniella Pineda",
      "starList": [
          {
              "id": null,
              "name": "Gerard Butler"
          },
          {
              "id": null,
              "name": "Mike Colter"
          },
          {
              "id": null,
              "name": "Yoson An"
          },
          {
              "id": null,
              "name": "Daniella Pineda"
          }
      ]
  },
  ],
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
