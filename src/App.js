import React from 'react';
import './App.css';
import AnimeList from './AnimeList';
import AnimeSearch from './AnimeSearch';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Profile from './Profile';


function App() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>GEEKED</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<AnimeSearch />} />
          <Route path="/rate" element={<AnimeList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </header>
    </div>
  );  
}

export default App;
