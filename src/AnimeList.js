import React, { useState, useEffect } from 'react';
import './App.css';

function AnimeList() {
  const [animes, setAnimes] = useState([]);
  const [newAnime, setNewAnime] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const savedAnimes = JSON.parse(localStorage.getItem('animeRatings')) || [];
    setAnimes(savedAnimes);
  }, []);

  const addAnime = () => {
    if (newAnime && rating) {
      const updatedAnimes = [...animes, { name: newAnime, rating }];
      setAnimes(updatedAnimes);
      setNewAnime('');
      setRating('');
      localStorage.setItem('animeRatings', JSON.stringify(updatedAnimes));
    }
  };

  return (
    <div className="AnimeList">
      <h2>Rate an Anime</h2>
      <input
        type="text"
        placeholder="Anime Name"
        value={newAnime}
        onChange={(e) => setNewAnime(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={addAnime}>Add Anime</button>
      <ul>
        {animes.map((anime, index) => (
          <li key={index}>
            {anime.name} - {anime.rating}/10
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimeList;
