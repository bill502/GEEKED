import React from 'react';
import './App.css';  // Ensure this import is here to apply the styles

// Component to display detailed information about a selected anime
function AnimeDetail({ anime, onBack }) {
  return (
    <div className="AnimeDetail">
      <button onClick={onBack}>Back</button>
      <h2>{anime.title.romaji || anime.title.english}</h2>
      <img src={anime.coverImage.medium} alt={anime.title.romaji} />
      <p>{anime.description}</p>
      <p>Episodes: {anime.episodes}</p>
      <p>Genres: {anime.genres.join(', ')}</p>
      <p>Average Score: {anime.averageScore}</p>
    </div>
  );
}

export default AnimeDetail;
