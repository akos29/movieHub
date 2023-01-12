/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  Form, useLoaderData, useNavigation, useSubmit,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { matchSorter } from 'match-sorter';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  // const contacts = await getMovie(q,);
  return q;
}

export function pagination(length) {
  const arr = [];
  let j = 1;
  for (let i = 1; i <= length - 10; i += 10) {
    arr[j] = i;
    j += 1;
  }
  return arr;
}

const numberSeparator = (a) => a.replace(new RegExp(`^(\\d{${a.length % 3 ? a.length % 3 : 0}})(\\d{3})`, 'g'), '$1 $2').replace(/(\d{3})+?/gi, '$1 ').trim();

export function getMovie(query, m) {
  let movies = m;
  if (!movies) {
    movies = [];
  }
  if (query) {
    movies = matchSorter(movies, query, { keys: ['title', 'fulltitle '] });
  }
  return movies.sort(sortBy('title', 'first'));
}

function Search({ movies }) {
  const qr = useLoaderData();
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(6);
  const navigation = useNavigation();
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');
  const [searchMovies, setSearchMovies] = useState(movies.slice(0, 6));
  const pages = pagination(movies.length);
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
        <>{qr}</>
        <input
          type="number"
          min={1}
          max={movies.length}
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
            setSearchMovies(movies.slice(0, limit));
          }}
        />
      </div>
      <div id="search-detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        { searchMovies.length > 0
          ? searchMovies.map((movie) => (
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
                  <ul className="stat">
                    <li>
                      Rating
                      <span>
                        {' '}
                        {movie.imDbRating}
                        {' '}
                      </span>
                    </li>
                    <li>
                      Count
                      <span>
                        {' '}
                        {numberSeparator(movie.imDbRatingCount)}
                        {' '}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )) : (
            <h1>
              We couldn&apos;t find
              {' '}
              {q}
              {' '}
              please try another
              {' '}
            </h1>
          )}
        <ul className="pagination">
          <li><IoIosArrowBack /></li>
          {pages.length > 0 ? pages.map((index, value) => <li key={index} onClick={() => setSearchMovies(movies.slice(index, (index + 6)))}>{value}</li>) : null }
          <li><IoIosArrowForward /></li>
        </ul>
      </div>

    </>
  );
}

Search.defaultProp = {
  movies: [],
};

Search.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  movies: PropTypes.array.isRequired,
};

export default Search;
