import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movie/movieSlice';
import boxOfficeReducer from '../features/boxoffice/boxofficeSlice';
import BoxOfficeAllTimeReducer from '../features/BoxOfficeAllTime/BoxOfficeAllTimeSlice';
import ComingSoonReducer from '../features/comingSoon/comingSoonSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    boxOffice: boxOfficeReducer,
    allTime: BoxOfficeAllTimeReducer,
    comingSoon: ComingSoonReducer,
  },
});

export default store;
