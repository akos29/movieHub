/* eslint-disable */
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from '../components/Header';

export default function Root() {
  const [home,setHome] = useState(true);
  
  return (
    <>
    { home ? <div id="main-menu" onClick={() => setHome(false)}>
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
                Top 250

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
                Box Office

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
                Box Office All Times 

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
                Coming Soon 

              </NavLink>
            </li>
          </ul>
        </nav>
      </div> : <NavLink
                to="/"
                className={({ isActive, isPending }) => (isActive
                  ? 'active'
                  : isPending
                    ? 'pending'
                    : '')}
                    onClick={() => setHome(true)}
              >
                &lt;

              </NavLink>}
      
      <div id="detail" className= {navigation.state === "loading" ? "loading" : ""}>
        <Outlet />  
       
      </div>
    </>
  );
}
