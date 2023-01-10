import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../features/movie/movieSlice';
import Search from '../Search';

function Top250() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    if (movies.length < 1) {
      dispatch(getMovies());
    }
  }, [movies, dispatch]);

  if (movies.length < 0) {
    return (
      <>
        <h3>Please try again later</h3>
      </>
    );
  }

  return (
    <>
      <Search movies={movies} />
    </>
  );
}

export default Top250;
