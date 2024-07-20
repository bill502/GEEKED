import React, { useState, useEffect } from 'react';
import './AnimeDetail.css';

function AnimeDetail({ anime, onBack, ratings, setRatings }) {
  const [rating, setRating] = useState('');

  useEffect(() => {
    const existingRating = ratings.find(r => r.anime.id === anime.id);
    if (existingRating) {
      setRating(existingRating.rating);
    }
  }, [anime, ratings]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const saveRating = () => {
    const updatedRatings = [...ratings];
    const existingIndex = updatedRatings.findIndex(r => r.anime.id === anime.id);

    if (existingIndex >= 0) {
      updatedRatings[existingIndex].rating = Number(rating);
    } else {
      updatedRatings.push({ anime, rating: Number(rating) });
    }

    setRatings(updatedRatings);
  };

  return (
    <div className="AnimeDetail">
      <button onClick={onBack}>Back</button>
      <h2>{anime.title.romaji || anime.title.english}</h2>
      <img src={anime.coverImage.large} alt={anime.title.romaji} />
      <p>{anime.description}</p>
      <p>Episodes: {anime.episodes}</p>
      <p>Genres: {anime.genres.join(', ')}</p>
      <p>Average Score: {anime.averageScore}</p>
      
      <div className="rating-section">
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          placeholder="Rate out of 100"
          max={100}
          min={0}
        />
        <button onClick={saveRating}>Save Rating</button>
      </div>
    </div>
  );
}

export default AnimeDetail;
