import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Store from '../../app/store';
import Top250 from './Top250';

it('Rockets Component snapshot test', () => {
  const movies = TestRenderer
    .create(
      <Provider store={Store}>
        <Top250 />
      </Provider>,
    )
    .toJSON();
  expect(movies).toMatchSnapshot();
});
