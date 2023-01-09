import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider, createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';
// import Index from './routes/index';
// import { loader as movieLoader } from './routes/movie';
import Top250 from './components/movie/Top250';
import BoxOffice from './components/movie/BoxOffice';
import BoxOfficeAllTimes from './components/movie/BoxOfficeAllTimes';
import ComingSoon from './components/movie/ComingSoon';
import { getMovies } from './features/movie/movieSlice';

store.dispatch(getMovies());

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Top250 />} />
        <Route
          path="/top250"
          element={<Top250 />}
        />
        <Route
          path="/boxoffice"
          element={<BoxOffice />}

        />
        <Route
          path="/alltimes"
          element={<BoxOfficeAllTimes />}
        />
        <Route
          path="/comingsoon"
          element={<ComingSoon />}
        />

      </Route>
    </Route>,
  ),
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
