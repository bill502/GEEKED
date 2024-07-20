import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { updateProfile, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function Profile() {
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (currentUser) {
      try {
        await updateProfile(currentUser, { displayName });
        setMessage('Profile updated successfully!');
      } catch (error) {
        setMessage('Error updating profile: ' + error.message);
      }
    }
  };

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
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
