import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

function Home() {
  return (
    <>
      <Navbar />

      <div id="detail">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Home;
