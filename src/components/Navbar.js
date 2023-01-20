import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function Navbar() {
  const [home, setHome] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      { home ? (
        <header className={home ? 'show' : 'hide'}>
          <div className="logo-container" id="logo">
            <NavLink
              to="/"
              onClick={() => setHome(true)}
            >
              Flip Movies
            </NavLink>
          </div>
          <nav className="menu-nav">
            <ul>
              <li className="col-2">
                <NavLink
                  to="/boxoffice"
                  onClick={() => setHome(false)}
                  onKeyDown={() => setHome(false)}
                >
                  Box Office
                </NavLink>
              </li>
              <li className="col-1">
                <NavLink
                  to="/alltimes"
                  onClick={() => setHome(false)}
                  onKeyDown={() => setHome(false)}
                >
                  All
                </NavLink>
              </li>
              <li className="col-2">
                <NavLink
                  to="/comingsoon"
                  onClick={() => setHome(false)}
                  onKeyDown={() => setHome(false)}
                >
                  {' '}
                  Coming
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      )
        : (
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
        ) }
    </>
  );
}

export default Navbar;
