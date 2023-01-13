import React from 'react';
import { useSelector } from 'react-redux';

function Movies() {
  const movies = useSelector((state) => state.movies.movies);
  return (
    <div className="wrapper">
      <div>Movies</div>
      <div id="search-detail">
        { movies.length > 0
          ? movies.map((movie) => (
            <>
              <div className="card" key={movie.id}>
                <div className="card-image" key={movie.fullTitle}>
                  <img src={movie.image} alt={movie.fullTitle} key={`${movie.fullTitle}image`} />
                </div>
                <div className="card-detail" key={movie.title}>
                  <h3 className="title" key={movie.id + movie.title}>{movie.title}</h3>
                  <h4 id={movie.rank}>
                    Rank
                    <span key={movie.id + movie.rank}>{movie.rank}</span>
                  </h4>
                  <ul className="stat" key={movie.imDbRating}>
                    <li key={`${movie.imDbRating}rating`}>
                      Rating
                      <span key={movie.title + movie.id}>
                        {' '}
                        {movie.imDbRating}
                        {' '}
                      </span>
                    </li>
                    <li key={movie.imDbRatingCount}>
                      Vote Count
                      <span key={movie.fullTitle + movie.rank}>
                        {' '}
                        {/* {numberSeparator(movie.imDbRatingCount)} */}
                        {' '}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )) : (
            <h1>
              We couldn&apos;t find it
              please try another
              {' '}
            </h1>
          )}
      </div>
    </div>
  );
}

export default Movies;
