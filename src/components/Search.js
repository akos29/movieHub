/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Form, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import sortBy from 'sort-by';
import { matchSorter } from 'match-sorter';

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  // const contacts = await getMovie(q,);
  return q;
}

export function pagination(length) {
  let arr=[];
  let j=1;
  for(let i=1; i<= length-10; i+=10) {
    arr[j]=i;  
    j++;
  }
console.log(arr);
  return arr;
}

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
  const qr = useLoaderData()
  const [q, setQ] = useState(qr);
  const [limit, setLimit] = useState(5);
  const navigation = useNavigation();
  const submit = useSubmit();

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');
  const [searchMovies, setSearchMovies] = useState(movies.slice(0,5));
  console.log(movies.length)
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
                <ul className="stat">
                  <li>
                    Rating
                    <span> {movie.imDbRating} </span>
                  </li>
                  <li>
                    Count
                    <span> {movie.imDbRatingCount} </span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )) : <h1>We couldn't find {q} please try another </h1>
      }
      </div>
      <ul className="pagination">
        <li>&lt;</li>
        {pages.length>0 ? pages.map((index,value) => {
          return <li onClick={() => setSearchMovies(movies.slice(index,(index+5)))}>{value}</li>
        }) : null }
        <li>&gt;</li>
      </ul>
    </>
  );
}

export default Search;
