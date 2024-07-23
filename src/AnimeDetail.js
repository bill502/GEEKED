import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnimeDetail.css';

function AnimeDetail({ animeId, onBack, ratings, setRatings }) {
  const [anime, setAnime] = useState(null);
  const [rating, setRating] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/animes/${animeId}`)
      .then(response => {
        console.log('Anime details fetched:', response.data); // Log the anime details
        setAnime(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch anime details:', error);
      });
  }, [animeId]);

  useEffect(() => {
    const existingRating = ratings.find(r => r.anime.id === animeId);
    if (existingRating) {
      setRating(existingRating.rating);
    }
  }, [animeId, ratings]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const saveRating = () => {
    const updatedRatings = [...ratings];
    const existingIndex = updatedRatings.findIndex(r => r.anime.id === animeId);

    if (existingIndex >= 0) {
      updatedRatings[existingIndex].rating = Number(rating);
    } else {
      updatedRatings.push({ 
        anime: { 
          id: animeId, 
          title: anime.title, 
          coverImage: anime.cover_image || anime.coverImage.large // Ensure coverImage is included
        }, 
        rating: Number(rating) 
      });
    }

    setRatings(updatedRatings);
  };

  if (!anime) {
    return <p>Loading...</p>;
  }

  return (
    <div className="AnimeDetail">
      <button onClick={onBack}>Back</button>
      <h2>{anime.title.romaji || anime.title.english}</h2>
      <img src={anime.cover_image || anime.coverImage.large} alt={anime.title.romaji || anime.title.english} />
      <p>{anime.description}</p>
      <p>Episodes: {anime.episodes}</p>
      <p>Genres: {Array.isArray(anime.genres) ? anime.genres.join(', ') : anime.genres}</p>
      <p>Average Score: {anime.average_score || anime.averageScore}</p>
      
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
