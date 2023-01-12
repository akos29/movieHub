import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import { getMovie } from '../Search';
import { getBoxOfficeAllTime } from '../../features/BoxOfficeAllTime/BoxOfficeAllTimeSlice';

function BoxOfficeAllTimes() {
  const dispatch = useDispatch();
  const boxOfficeAllTimeMovies = useSelector((state) => state.allTime.boxOfficeAllTime);
  const status = useSelector((state) => state.comingSoon.status);
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(6);

  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');
  const [searchMovies, setSearchMovies] = useState(boxOfficeAllTimeMovies.slice(0, limit));

  useEffect(() => {
    if (boxOfficeAllTimeMovies.length < 1 && status === 'idle') {
      dispatch(getBoxOfficeAllTime());
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
              setSearchMovies(getMovie(q, boxOfficeAllTimeMovies));
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
          min={1}
          max={boxOfficeAllTimeMovies.length}
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
            setSearchMovies(boxOfficeAllTimeMovies.slice(0, limit));
          }}
        />
      </div>
      <div id="search-detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        {
          status !== 'failed'
            ? searchMovies.map((movie) => (
              <>
                <div className="card" key={movie.id}>
                  <table className="card-detail">
                    <tbody className="card-detail">
                      <tr>
                        <td>Rank</td>
                        {' '}
                        <td>{movie.rank}</td>
                      </tr>
                      <tr>
                        <td>Title</td>
                        {' '}
                        <td>{movie.title}</td>
                      </tr>
                      <tr>
                        <td>Life Time Worth</td>
                        {' '}
                        <td>{movie.worldwideLifetimeGross}</td>
                      </tr>
                      <tr>
                        <td>Domestic (%)</td>
                        {' '}
                        <td>{movie.domestic}</td>
                      </tr>
                      <tr>
                        <td>Foreign (%)</td>
                        {' '}
                        <td>{movie.foreign}</td>
                      </tr>
                      <tr>
                        <td>Year</td>
                        {' '}
                        <td>{movie.year}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ))
            : <>There is something wrong, please try again</>
          }
      </div>
    </>
  );
}

export default BoxOfficeAllTimes;
