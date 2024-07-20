import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import AnimeDetail from './AnimeDetail';
import './AnimeSearch.css';

const SEARCH_ANIME = gql`
  query SearchAnime($search: String) {
    Page(perPage: 10) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        averageScore
        description
        episodes
        genres
      }
    }
  }
`;

function AnimeSearch() {
  const [search, setSearch] = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [ratings, setRatings] = useState([]);
  const { loading, error, data } = useQuery(SEARCH_ANIME, {
    variables: { search },
    skip: !search,
  });

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

  const addRating = (anime, rating) => {
    setRatings([...ratings, { anime, rating }]);
  };

  const getRating = (anime) => {
    const found = ratings.find((r) => r.anime.id === anime.id);
    return found ? found.rating : 'N/A';
  };

  return (
    <div className="AnimeSearch">
      {selectedAnime ? (
        <AnimeDetail anime={selectedAnime} onBack={() => setSelectedAnime(null)} />
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
          {error && <p>Error: {error.message}</p>}
          {data && (
            <div className="anime-container">
              <div className="anime-grid">
                {data.Page.media.length > 0 ? (
                  data.Page.media.map((anime) => (
                    <div key={anime.id} className="anime-card" onClick={() => setSelectedAnime(anime)}>
                      <img src={anime.coverImage.large} alt={anime.title.romaji} />
                      <div>
                        <h3>{anime.title.romaji || anime.title.english}</h3>
                        <p>Average Score: {anime.averageScore}</p>
                        <p>Your Rating: {getRating(anime)}</p>
                        <button onClick={() => addRating(anime, prompt('Enter your rating:'))}>
                          Rate this Anime
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AnimeSearch;
