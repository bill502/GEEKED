import React from 'react';
import './App.css';
import AnimeList from './AnimeList';
import AnimeSearch from './AnimeSearch';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import NavBar from './NavBar';

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
        </Routes>
      </header>
    </div>
  );  
}

export default App;
