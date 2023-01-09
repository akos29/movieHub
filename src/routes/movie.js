/* eslint-disable */

import React from 'react';
// import { Form, useFetcher, useLoaderData } from 'react-router-dom';
// import { getMovies } from '../components/movie/Top250';

export async function loader() {
  const movies = await getMovies();
  if (!movies) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return movies;
}

function movie() {
  return (
    <div>movie</div>
  );
}

export default movie;
