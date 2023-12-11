import React from 'react';
import { PropType } from 'prop-types';
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function Navbar() {
  // const [home, setHome] = useState(true);
  // const home = useSelector((state) => state.movies.movies.parent);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(changeHome());
  // }, [dispatch, home]);
  const location = useLocation();
  const { home } = location;
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
            <NavLink
              to="/"
              onClick={() => setHome(true)}
              // onClick={() => {
              //   dispatch(setHome(true));
              //   navigate('/');
              // }}
            >
              <IoIosArrowBack size={50} />
            </NavLink>

          </header>
        ) }
    </>
  );
}

Navbar.propType = {
  home: PropType.boolean.required,
  setHome: PropType.function,
};

export default Navbar;
