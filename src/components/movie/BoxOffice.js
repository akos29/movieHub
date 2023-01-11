import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import { getMovie } from '../Search';
import { getBoxOffice } from '../../features/boxoffice/boxofficeSlice';

function BoxOffice() {
  const dispatch = useDispatch();
  const boxOfficeMovies = useSelector((state) => state.boxOffice.boxOffice);
  const status = useSelector((state) => state.boxOffice.status);
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(5);

  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');
  const [searchMovies, setSearchMovies] = useState(boxOfficeMovies.slice(0, limit));

  useEffect(() => {
    if (boxOfficeMovies.length < 1 && status === 'idle') {
      dispatch(getBoxOffice());
      setSearchMovies(boxOfficeMovies.slice(0, limit));
      setLimit(5);
    }
  }, [status, dispatch]);

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
              setSearchMovies(getMovie(q, boxOfficeMovies));
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
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        {searchMovies.map((movie) => (
          <>
            <div className="box-card" key={movie.id}>
              <div className="image-container">
                <img src={movie.image} alt={movie.title} />
              </div>
              <div className="box-detail">
                <h2>{movie.title}</h2>
                <ul>
                  <li>
                    Weekend total
                    {movie.weekend}
                  </li>
                  <li>
                    Gross total
                    {movie.gross}
                  </li>
                  <li>
                    Week(s)-
                    {movie.weeks}
                  </li>
                </ul>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default BoxOffice;
