import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import axios from '../../apis/imdbAPI';
import store from '../../app/store';
import Movies from './Movies';

jest.mock('../../apis/imdbAPI');

describe('Movies Test', () => {
  it('Top 250 movies snapshot test', () => {
    const movies = TestRenderer
      .create(
        <Provider store={store}>
          <Movies />
        </Provider>,
      )
      .toJSON();
    expect(movies).toMatchSnapshot();
  });

  test('should render movies rating ', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Movies />
      </Provider>,
    );
    expect(getByText(/Movies/i)).toBeInTheDocument();
  });
  beforeEach(async () => {
    const result = {
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
        {
          id: 'tt0111166',
          rank: '1',
          title: 'The Godfather',
          fullTitle: 'The Shawshank Redemption (1994)',
          year: '1994',
          image: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg',
          crew: 'Frank Darabont (dir.), Tim Robbins, Morgan Freeman',
          imDbRating: '9.2',
          imDbRatingCount: '2682825',
        },
      ],

    };
    await axios.get.mockResolvedValue(result);
  });

  test('should render the searched result', async () => {
    render(<Provider store={store}><Movies /></Provider>);
    await waitFor(() => {
      expect(screen.getAllByText('Rank').length).toBeGreaterThan(1);
    });
  });
});
