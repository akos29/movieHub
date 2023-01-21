import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { changeHome } from '../features/movie/movieSlice';

function Navbar() {
  // const [home, setHome] = useState(true);

  const dispatch = useDispatch();
  const home = useSelector((state) => state.movies.parent);
  console.log(home);
  useEffect(() => {
    dispatch(changeHome());
  }, [dispatch, home]);
  // const location = useLocation();
  // const { home } = location;
  const navigate = useNavigate();
  return (
    <>
      { home ? (
        <header className={home ? 'show' : 'hide'}>
          <div className="logo-container" id="logo">
            <NavLink
              to="/"
              onClick={() => dispatch(changeHome())}
            >
              Flip Movies
            </NavLink>
          </div>
          <nav className="menu-nav">
            <ul>
              <li className="col-2">
                <NavLink
                  to="/boxoffice"
                  onClick={() => dispatch(changeHome())}
                  onKeyDown={() => dispatch(changeHome())}
                >
                  Box Office
                </NavLink>
              </li>
              <li className="col-1">
                <NavLink
                  to="/alltimes"
                  onClick={() => dispatch(changeHome())}
                  onKeyDown={() => dispatch(changeHome())}
                >
                  All
                </NavLink>
              </li>
              <li className="col-2">
                <NavLink
                  to="/comingsoon"
                  onClick={() => dispatch(changeHome())}
                  onKeyDown={() => dispatch(changeHome())}
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
                dispatch(changeHome(true));
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
