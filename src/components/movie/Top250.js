import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../features/movie/movieSlice';

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
      { movies.map((movie) => (
        <>
          <div className="card">
            <p key={movie.description}>{movie.description}</p>
            {/* <div>
                <img src={movie.image} alt={movie.fullTitles} />
              </div>
              <div>
                <h3 className="title">{movie.title}</h3>
                <h4>{movie.rank}</h4>
                <ul>
                  <li>{movie.year}</li>
                  <li>{movie.imDbRating}</li>
                </ul>
              </div> */}
          </div>
        </>
      ))}
    </>
  );
}

export default Top250;
