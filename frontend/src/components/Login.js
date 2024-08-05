import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        if (data.userID) {
          localStorage.setItem('userID', data.userID);
          navigate('/main');
        } else {
          console.error('Login response missing userID:', data);
        }
      } else {
        console.error('Login failed with status:', response.status);
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button className="link-button" onClick={() => navigate('/register')}>Go to Register</button>
    </div>
  );
}

export default Login;
