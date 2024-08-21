import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/profile';
import Register from './components/Register';

function App() {
  

  const isLoggedIn = !!localStorage.getItem('userID'); // Check if user is logged in

  return (
    <Router>
      <div>
        <Routes>
          {/* Redirect to Main if logged in, otherwise show Login */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/main" /> : <Login />} />

          {/* Register route */}
          <Route path="/register" element={<Register />} />

          {/* Main route, only accessible if logged in */}
          <Route path="/main" element={isLoggedIn ? <Main /> : <Navigate to="/login" />} />

          {/* Profile route, only accessible if logged in */}
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

          {/* Default route */}
          <Route path="/" element={<Navigate to={isLoggedIn ? "/main" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;