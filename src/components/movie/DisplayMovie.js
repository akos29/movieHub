import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function DisplayMovie() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <header>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoIosArrowBack size={50} />
        </button>

      </header>

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
                  {/* {numberSeparator(location.state.imDbRatingCount)} */}
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
