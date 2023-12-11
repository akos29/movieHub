import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Footer from '../Footer';
import Navbar from '../Navbar';
import { changeHome } from '../../features/movie/movieSlice';

function Home() {
  const [home, setHome] = useState(useSelector((state) => state.movies.parent));

  const dispatch = useDispatch();
  console.log(home);
  useEffect(() => {
    changeHome();
  }, [dispatch, home]);
  return (
    <>
      <Navbar home={home} setHome={setHome} />

      <div id="detail">
        <Outlet home={home} setHome={setHome} />
        <Footer />
      </div>
    </>
  );
}

export default Home;
