import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../app/store';
import Footer from './Footer';

it('Footer Component snapshot test', () => {
  const footer = TestRenderer
    .create(
      <Provider store={store}>
        <Footer />
      </Provider>,
    )
    .toJSON();
  expect(footer).toMatchSnapshot();
});
