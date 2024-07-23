import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeDetail from './AnimeDetail';
import './AnimeSearch.css';

// Function to search anime
const fetchAnime = async (search) => {
  try {
    const response = await axios.get(`http://localhost:3000/search_anime?search=${search}`);
    return response.data.data.Page.media;  // Adjusted to access the nested media array
  } catch (error) {
    throw new Error('Failed to fetch data. Please try again.');
  }
};

function AnimeSearch({ ratings, setRatings }) {
  const [search, setSearch] = useState('');
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data when search changes
  useEffect(() => {
    if (search) {
      setLoading(true);
      fetchAnime(search)
        .then((data) => {
          setData(data);
          setFetchError('');
        })
        .catch((error) => {
          setFetchError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [search]);

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('animeRatings')) || [];
    setRatings(savedRatings);
  }, []);

  useEffect(() => {
    localStorage.setItem('animeRatings', JSON.stringify(ratings));
  }, [ratings]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const getRating = (anime) => {
    const found = ratings.find((r) => r.anime.id === anime.id);
    return found ? found.rating : 'N/A';
  };

  return (
    <div className="AnimeSearch">
      {selectedAnimeId ? (
        <AnimeDetail
          animeId={selectedAnimeId}
          onBack={() => setSelectedAnimeId(null)}
          ratings={ratings}
          setRatings={setRatings}
        />
      ) : (
        <>
          <h2>Search for an Anime</h2>
          <input
            type="text"
            placeholder="Enter anime name"
            value={search}
            onChange={handleSearch}
          />
          {loading && <p>Loading...</p>}
          {fetchError && <p>{fetchError}</p>}
          {data.length > 0 && !fetchError && (
            <div className="anime-container">
              <div className="anime-grid">
                {data.map((anime) => (
                  <div key={anime.id} className="anime-card" onClick={() => setSelectedAnimeId(anime.id)}>
                    <img src={anime.coverImage.large} alt={anime.title.romaji || anime.title.english} />
                    <div>
                      <h3>{anime.title.romaji || anime.title.english}</h3>
                      <p>Average Score: {anime.averageScore}</p>
                      <p>Your Rating: {getRating(anime)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AnimeSearch;
