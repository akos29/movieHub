/* eslint-disable */
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import { FaBoxOpen, FaTrain } from 'react-icons/fa';
import { GiOpenTreasureChest } from 'react-icons/gi';

import Header from '../components/Header';

export default function Root() {
  const [home,setHome] = useState(true);

  return (
    <>
    { home ? <div id="main-menu" className={home ? 'show' : 'hide'} onClick={() => setHome(false)}>
        <div className='logo-container'>
          <NavLink
                to="/"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
          <Header />
        </NavLink>
        </div>
        <nav id='menu-items'>
          <ul>
            <li>
              <NavLink
                to="/top250"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
              <BiCameraMovie size={57} /> Top 250
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/boxoffice"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              > 
              <FaBoxOpen size={57} /> Box Office 
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alltimes"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
                <GiOpenTreasureChest size={57} /> Box Office All Times
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/comingsoon"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
                
                <FaTrain size={57} /> Coming Soon
              </NavLink>
            </li>
          </ul>
        </nav>
      </div> 
      : <>
        <div className='menu-detail' onClick={() => setHome(true)}>
          <NavLink
            to="/"
          >
            &lt;
          </NavLink>
          </div>
          
          <div id="detail" style={{backgroundColor: '#4369b2'}} className={navigation.state === "loading" ? "loading" : ""}>
          
            <Outlet />
          </div></>      
              }
    </>
  );
}
