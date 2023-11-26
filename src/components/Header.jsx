import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50 py-3">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={
                location.pathname === '/'
                  ? 'text-red-500 border-b-[3px] border-red-500'
                  : ''
              }
            >
              Home
            </li>
            <li>Offers</li>
            <li>Sign In</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
