import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';

function Header() {
  const location = useLocation();

  const isActive = (path) => {
    if (location.pathname === path) {
      return true;
    }
  };

  const HeaderTitle = ({ path, title }) => {
    return (
      <li
        className={`hover:text-blue-500 cursor-pointer mt-2 py-3
          ${isActive(path) ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
      >
        <Link to={path}>{title}</Link>
      </li>
    );
  };
  const { checkingStatus, loggedIn } = useAuthStatus();

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40 ">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <Link to="/">
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="logo"
              className="h-5 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <ul className="flex space-x-5 whitespace-nowrap">
            <HeaderTitle path="/" title="Home" />
            <HeaderTitle path="/offers" title="Offers" />
            {checkingStatus ? (
              <HeaderTitle path="/sign-in" title="Sign In" />
            ) : loggedIn ? (
              <HeaderTitle path="/profile" title="Profile" />
            ) : (
              <HeaderTitle path="/sign-in" title="Sign In" />
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
