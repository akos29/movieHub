/* eslint-disable */

import React, { useState } from 'react';
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import sortBy from 'sort-by';
import { matchSorter } from 'match-sorter';

export function getMovie(query, movies) {
  if (!movies) {
    movies = [];
  }
  if (query) {
    movies = matchSorter(movies, query, { keys: ['title', 'fulltitle '] });
  }
  return movies.sort(sortBy('title', 'first'));
}

function Search({ movies }) {
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(5);
  const navigation = useNavigation();
  const submit = useSubmit();
  

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');
  const [searchMovies, setSearchMovies] = useState(movies);

  return (
    <>
      <div className="search">
        <Form id="search-form" role="search">
          <input
            id="q"
            className={searching ? 'loading' : ''}
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q}
            onChange={(event) => {
              const isFirstSearch = q == null;
              setQ(event.target.value);
              setSearchMovies(getMovie(q, movies));
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
          />
          <div
            id="search-spinner"
            aria-hidden
            hidden={!searching}
          />
          <div
            className="sr-only"
            aria-live="polite"
          />
        </Form>
        <input
          type="number"
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
            setSearchMovies(movies.slice(0, limit));
          }}
        />
      </div>
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
      { searchMovies.length>0 ?
        searchMovies.map((movie) => (
          <>
            <div className="card" key={movie.id}>
              <div className="card-image">
                <img src={movie.image} alt={movie.fullTitle} />
              </div>
              <div className="card-detail">
                <h3 className="title">{movie.title}</h3>
                <h4>
                  Rank
                  <span>{movie.rank}</span>
                </h4>
              </div>
              <ul className="stat">
                <li>
                  Rating
                  {movie.imDbRating}
                </li>
                <li>
                  Count
                  {movie.imDbRatingCount}
                </li>
              </ul>
            </div>
          </>
        )) : <h1>We couldn't find {q} please try another </h1>
      }
      </div>
     
    </>
  );
}

export default Search;
