import React from 'react';
import { useSelector } from 'react-redux';

function ComingSoon() {
  const movies = useSelector((state) => state.movies.movies);

  return (
    <ul>
      {
        movies.map((movie) => <li key={movie.description}>{movie.description}</li>)
      }
    </ul>

  );
}

export default ComingSoon;
