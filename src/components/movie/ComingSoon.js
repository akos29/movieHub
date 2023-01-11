import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigation, useSubmit } from 'react-router-dom';
import { getMovie } from '../Search';
import { getComingSoon } from '../../features/comingSoon/comingSoonSlice';

function ComingSoon() {
  const dispatch = useDispatch();
  const comingSoonMovies = useSelector((state) => state.comingSoon.comingSoon);
  const status = useSelector((state) => state.comingSoon.status);
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(5);

  const navigation = useNavigation();
  const submit = useSubmit();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');
  const [searchMovies, setSearchMovies] = useState(comingSoonMovies.slice(0, limit));
  console.log(searchMovies, 'Aha');

  useEffect(() => {
    if (comingSoonMovies.length < 1 || status === 'idle') {
      dispatch(getComingSoon());
    }
  }, [comingSoonMovies, dispatch]);

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
              setSearchMovies(getMovie(q, comingSoonMovies));
              submit(event.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
          />
          <div
            id="search-spinner"
            aria-hidden
            hidden={searching}
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
            setSearchMovies(comingSoonMovies.slice(0, limit));
          }}
        />
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        {
          status !== 'failed'
            ? searchMovies.map((movie) => (
              <>
                <div className="coming-card" key={movie.id}>
                  <div className="image-container">
                    <img src={movie.image} alt={movie.title} />
                  </div>
                  <div className="box-detail">
                    <h2>{movie.title}</h2>
                    <h4>
                      Release Date:
                      {movie.releaseState}
                    </h4>
                    <ul>
                      <li>
                        Stars:
                        {movie.stars}
                      </li>
                      <li>
                        Director
                        {movie.director}
                      </li>
                    </ul>
                  </div>
                </div>

              </>
            ))
            : <>There is something wrong, please try again</>

        }
      </div>
    </>
  );
}

export default ComingSoon;
