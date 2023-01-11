/* eslint-disable */
import { useState } from 'react';
import {  Outlet, NavLink } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import { FaBoxOpen, FaTrain } from 'react-icons/fa';
import { GiOpenTreasureChest } from 'react-icons/gi';
import Footer from '../components/Footer';

export default function Root() {
  
  const [home,setHome] = useState(true);

  return (
    <>
    { home ? <div id="main-menu" className={home ? 'show' : 'hide'} onClick={() => setHome(false)}>
        <div className='logo-container' id="logo">
          <NavLink
                to="/"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
        </NavLink>
        </div>
        <nav id='menu-items'>
          <ul>
            <div className='row'><li className='col-1'>
              <NavLink
                to="/top250"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
              <BiCameraMovie size={57} /> <p>Top 250</p>
              </NavLink>
            </li>
            <li className='col-2'>
              <NavLink
                to="/boxoffice"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              > 
              <FaBoxOpen size={57} /> <p>Box Office </p>
              </NavLink>
            </li></div>
            <div className='row'> <li className='col-1'>
              <NavLink
                to="/alltimes"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
                <GiOpenTreasureChest size={57} /> <p>Box Office All Times</p>
              </NavLink>
            </li>
            <li className='col-2'>
              <NavLink
                to="/comingsoon"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
                
                <FaTrain size={57} /> <p>Coming Soon</p>
              </NavLink>
            </li></div>
            
           
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

            {/* <Search movies={movies} /> */}
            <Outlet />
            <Footer />
          </div></>      
              }
    </>
  );
}
