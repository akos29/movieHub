/* eslint-disable */
import { useState } from 'react';
import {  Outlet, NavLink, useNavigation, useLoaderData } from 'react-router-dom';
import { BiCameraMovie } from 'react-icons/bi';
import { FaBoxOpen, FaTrain } from 'react-icons/fa';
import { GiOpenTreasureChest } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io'
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
            <li className='col-1'>
              <NavLink
                to="/top250"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
              <BiCameraMovie size={65} className='icons' /> <h4>Top 250</h4>
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
              <FaBoxOpen size={65} className='icons' /> <h4>Box Office </h4>
              </NavLink>
            </li>
            <li className='col-1'>
              <NavLink
                to="/alltimes"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
              >
                <GiOpenTreasureChest size={65} className='icons' /> <h4>All Times</h4>
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
                
                <FaTrain size={65} className='icons' /> <h4>Coming Soon</h4>
              </NavLink>
            </li>           
          </ul>
        </nav>
      </div> 
      : <>
          <div className='menu-detail' onClick={() => setHome(true)}>
            <NavLink to="/">
              <IoIosArrowBack />
            </NavLink>
          </div>

        </>  }
        
        <div id="detail" style={{ backgroundColor: '#000' }} >

            {/* <Search movies={movies} /> */}
            <Outlet />
            <Footer />
          </div>
    </>
  );
}
