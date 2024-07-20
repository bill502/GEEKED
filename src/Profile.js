import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './Profile.css';  // Make sure this CSS file is created

// Component to display and update user profile information
function Profile() {
  const [displayName, setDisplayName] = useState(''); // State to hold the new display name
  const [message, setMessage] = useState(''); // State to hold success/error messages
  const [userInfo, setUserInfo] = useState(null); // State to hold user information

  const { currentUser } = useContext(AuthContext); // Get the current user from AuthContext

  // useEffect to handle auth state changes and update userInfo state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
    return () => unsubscribe();
  }, []);

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

  // Display a loading message if currentUser is not available
  if (!currentUser) {
    return <p>Loading...</p>;
  }

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
      {userInfo && (
        <div>
          <h3>Updated Information</h3>
          <p>Email: {userInfo.email}</p>
          <p>Display Name: {userInfo.displayName}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
