import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">
        <Link to="/">GEEKED</Link>
      </h1>
      <ul className="navbar-links">
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/rate">Rate</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

