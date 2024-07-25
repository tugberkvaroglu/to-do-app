import React, { useState, useEffect } from 'react';

function Profile() {
  const [profile, setProfile] = useState({ username: '', email: '' });

  useEffect(() => {
    // Fetch profile data from your backend
    const fetchProfile = async () => {

        const userID = localStorage.getItem('userID'); // Retrieve user ID

        if (!userID) {
          // Handle case where user ID is not found
          console.error('User ID not found');
          return;
        }
      try {
        const response = await fetch('http://localhost:5000/api/users/${userID}');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <label>Username: </label>
        <span>{profile.username}</span>
      </div>
      <div>
        <label>Email: </label>
        <span>{profile.email}</span>
      </div>
    </div>
  );
}

export default Profile;
