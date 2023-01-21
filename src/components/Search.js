import React, { useState, useEffect } from 'react';
import {
  Form, useSubmit, useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { matchSorter } from 'match-sorter';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { changeHome } from '../features/movie/movieSlice';

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
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
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(9);
  const navigate = useNavigate();
  const submit = useSubmit();

  const home = useSelector((state) => state.movies.movies.parent);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeHome());
  }, [dispatch, home]);
  useEffect(() => {
    document.getElementById('q').value = q;
  }, [q]);

  const [searchMovies, setSearchMovies] = useState(movies.slice(0, 9));
  const pages = pagination(movies.length);

  const setPagination = (start, end) => {
    setSearchMovies(movies.slice(start, end));
  };

  return (
    <>
      <div className="search">
        <Form id="search-form" role="search">
          <input
            id="q"
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

          />
          <div
            className="sr-only"
            aria-live="polite"
          />
        </Form>

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
      <div id="search-detail">
        { searchMovies.length > 0
          ? searchMovies.map((movie) => (
            <>
              <button
                onClick={() => {
                  navigate(`/top250/${movie.id}`, { state: movie });
                  dispatch(changeHome(false));
                }}
                type="button"
              >
                <>

                  <div className="card" key={movie.id}>
                    <div className="card-image">
                      <img src={movie.image} alt={movie.fullTitle} />
                    </div>
                    <div className="card-detail">
                      <ul>
                        <li><h3 className="title">{movie.title}</h3></li>
                        <li>
                          <h4>
                            Rank
                            <span className="movie-mark">{movie.rank}</span>
                          </h4>

                        </li>
                      </ul>

                    </div>
                  </div>
                </>
              </button>
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
          <li>
            {' '}
            <button type="button" aria-label="back-button" onClick={() => setPagination(0, 9)}><IoIosArrowBack /></button>
          </li>
          { pages.length > 0
            ? pages.map((index, value) => (
              <li key={index}>
                <button type="button" onClick={() => setPagination(index, (index + 9))}>
                  {value}
                </button>

              </li>
            ))
            : null }
          <li><button type="button" aria-label="forward-button" onClick={() => setPagination(movies.length - 7, movies.length - 1)}><IoIosArrowForward /></button></li>
        </ul>
      </div>

    </>
  );
}

Search.defaultProp = {
  movies: [
    {
      id: 'tt0111161',
      rank: '1',
      title: 'The Shawshank Redemption',
      fullTitle: 'The Shawshank Redemption (1994)',
      year: '1994',
      image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg',
      crew: 'Frank Darabont (dir.), Tim Robbins, Morgan Freeman',
      imDbRating: '9.2',
      imDbRatingCount: '2682825',
    },
  ],
};

Search.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  })).isRequired,
};
export default Search;
