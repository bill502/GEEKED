import React from 'react';
import './App.css';

function AnimeDetail({ anime, onBack }) {
  return (
    <div className="AnimeDetail">
      <button onClick={onBack}>Back</button>
      <h2>{anime.title.romaji || anime.title.english}</h2>
      <img src={anime.coverImage.large} alt={anime.title.romaji} /> {/* Use large image */}
      <p>{anime.description}</p>
      <p>Episodes: {anime.episodes}</p>
      <p>Genres: {anime.genres.join(', ')}</p>
      <p>Average Score: {anime.averageScore}</p>
    </div>
  );
}

export default AnimeDetail;
