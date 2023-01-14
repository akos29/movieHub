import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Footer from '../Footer';

function Home() {
  const [home, setHome] = useState(true);

  return (
    <>
      { home ? (
        <header className={home ? 'show' : 'hide'}>
          <div className="logo-container" id="logo">
            <NavLink
              to="/"
              onClick={() => setHome(true)}
            />
          </div>
          <nav className="menu-nav">
            <ul>
              <li className="col-1">
                <NavLink
                  to="/top250"
                  onClick={() => setHome(false)}
                  onKeyDown={() => setHome(false)}
                >
                  {' '}
                  Top 250
                </NavLink>
              </li>
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
                  All Times
                </NavLink>
              </li>
              <li className="col-2">
                <NavLink
                  to="/comingsoon"
                  onClick={() => setHome(false)}
                  onKeyDown={() => setHome(false)}
                >
                  {' '}
                  Coming Soon
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      )
        : (
          <header>
            <NavLink to="/" onClick={() => setHome(true)} onKeyDown={() => setHome(true)} className="back-home">
              <IoIosArrowBack size={92} />
            </NavLink>
          </header>
        ) }

      <div id="detail">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Home;
