import React from 'react';
import { useLocation } from 'react-router-dom';

function DisplayMovie() {
  const location = useLocation();

  const numberSeparator = (a) => a.replace(new RegExp(`^(\\d{${a.length % 3 ? a.length % 3 : 0}})(\\d{3})`, 'g'), '$1 $2').replace(/(\d{3})+?/gi, '$1 ').trim();

  return (
    <>

      <div className="card" key={location.state.id}>
        <div className="card-image">
          <img src={location.state.image} alt={location.state.fullTitle} />
        </div>
        <div className="card-detail">
          <ul>
            <li><h3 className="title">{location.state.title}</h3></li>
            <li>
              <h4>
                Rank
                <span className="location.state-mark">{location.state.rank}</span>
              </h4>

            </li>
            <li>
              <h4>
                Rating
                <span className="location.state-mark">
                  {location.state.imDbRating}
                </span>
              </h4>

            </li>
            <li>
              <h4>
                Count
                <span>
                  {' '}
                  {numberSeparator(location.state.imDbRatingCount)}
                  {' '}
                </span>
              </h4>

            </li>

          </ul>

        </div>
      </div>
    </>
  );
}

export default DisplayMovie;
