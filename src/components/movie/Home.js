import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import { FaBoxOpen, FaTrain } from 'react-icons/fa';
import { GiOpenTreasureChest } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import Footer from '../Footer';

function Home() {
  const [home, setHome] = useState(true);

  return (
    <>
      { home ? (
        <div id="main-menu" className={home ? 'show' : 'hide'}>
          <div className="logo-container" id="logo">
            <NavLink
              to="/"
              onClick={() => setHome(false)}
            />
          </div>
          <nav id="menu-items">
            <ul>
              <li className="col-1">
                <NavLink
                  to="/top250"

                >
                  <BiCameraMovie size={65} className="icons" />
                  {' '}
                  <h4>Top 250</h4>
                </NavLink>
              </li>
              <li className="col-2">
                <NavLink
                  to="/boxoffice"

                >
                  <FaBoxOpen size={65} className="icons" />
                  {' '}
                  <h4>Box Office </h4>
                </NavLink>
              </li>
              <li className="col-1">
                <NavLink
                  to="/alltimes"

                >
                  <GiOpenTreasureChest size={65} className="icons" />
                  {' '}
                  <h4>All Times</h4>
                </NavLink>
              </li>
              <li className="col-2">
                <NavLink
                  to="/comingsoon"

                >

                  <FaTrain size={65} className="icons" />
                  {' '}
                  <h4>Coming Soon</h4>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )
        : (
          <>
            <div className="menu-detail">
              <NavLink to="/" onClick={() => setHome(true)} onKeyDown={() => setHome(true)}>
                <IoIosArrowBack />
              </NavLink>
            </div>

          </>
        ) }

      <div id="detail" style={{ backgroundColor: '#000' }}>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Home;
