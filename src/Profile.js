import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './Profile.css';  // Make sure this CSS file is created

// Component to display and update user profile information
function Profile({ ratings, setRatings }) {
  const [displayName, setDisplayName] = useState(''); // State to hold the new display name
  const [message, setMessage] = useState(''); // State to hold success/error messages

  const { currentUser } = useContext(AuthContext); // Get the current user from AuthContext

  // Function to handle profile update form submission
  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (currentUser) {
      try {
        await updateProfile(currentUser, { displayName }); // Update the user's display name
        setMessage('Profile updated successfully!'); // Set success message
      } catch (error) {
        setMessage('Error updating profile: ' + error.message); // Set error message
      }
    }
  };

  // Function to handle rating change
  const handleRatingChange = (animeId, newRating) => {
    const updatedRatings = ratings.map(r => 
      r.anime.id === animeId ? { ...r, rating: Number(newRating) } : r
    );
    setRatings(updatedRatings);
  };

  // Function to handle removing an anime rating
  const handleRemoveAnime = (animeId) => {
    const updatedRatings = ratings.filter(r => r.anime.id !== animeId);
    setRatings(updatedRatings);
  };

  // Display a loading message if currentUser is not available
  if (!currentUser) {
    return <p>Loading...</p>;
  }

  // Sort ratings by rating value
  const sortedRatings = [...ratings].sort((a, b) => b.rating - a.rating);

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <p>Email: {currentUser.email}</p>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}

      <div className="ratings-section">
        <h3>Your Rated Anime</h3>
        {sortedRatings.length > 0 ? (
          <div className="anime-grid">
            {sortedRatings.map(r => (
              <div key={r.anime.id} className="anime-card">
                <h4>{r.anime.title.romaji || r.anime.title.english}</h4>
                <img src={r.anime.coverImage.large} alt={r.anime.title.romaji} />
                <p>Rating: {r.rating}</p>
                <input
                  type="number"
                  value={r.rating}
                  onChange={(e) => handleRatingChange(r.anime.id, e.target.value)}
                  placeholder="Update rating out of 100"
                />
                <button onClick={() => handleRemoveAnime(r.anime.id)}>Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No rated anime found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
