import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      if (response.ok) {
        navigate('/login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
      </div>
    </div>
  );
}

export default Register;
