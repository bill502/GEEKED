import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component to manage and provide authentication state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current authenticated user

  // useEffect to handle authentication state changes
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User state changed:', user); // Log the user state change
      }
      setCurrentUser(user); // Update the current user state
    });
    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    // Provide the current user state to the AuthContext
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
