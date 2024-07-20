import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import './NavBar.css';

function NavBar() {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut(auth);
  };

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
        {currentUser ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
