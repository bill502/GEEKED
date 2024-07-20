import React, { useState, useEffect } from 'react';
import './App.css';
import AnimeSearch from './AnimeSearch';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';

function App() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('animeRatings')) || [];
    setRatings(savedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem('animeRatings', JSON.stringify(ratings));
  }, [ratings]);

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>GEEKED</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<AnimeSearch ratings={ratings} setRatings={setRatings} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile ratings={ratings} setRatings={setRatings} />} />
        </Routes>
      </header>
    </div>
  );  
}

export default App;
