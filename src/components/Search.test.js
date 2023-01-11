import React from 'react';
import {
  render, screen, waitFor, act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import Store from '../app/store';
import Search from './Search';
import axios from '../apis/imdbAPI';

jest.mock('../apis/imdbAPI');

describe('', () => {
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

  afterEach(() => {
    act(() => Store.dispatch({
      type: 'movies/fetchMovies',
      payload: [],
    }));
  });

  test('should render the searched result', async () => {
    render(<Provider store={Store}><Search /></Provider>);
    await waitFor(() => {
      expect(screen.getAllByText('Rank').length).toBeGreaterThan(1);
    });
  });
});
