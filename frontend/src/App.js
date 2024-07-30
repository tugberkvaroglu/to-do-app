import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Main from './components/main';
import Profile from './components/profile';

function App() {
  
  const isLoggedIn = !!localStorage.getItem('userID'); // Check if user is logged in

  return (
    <Routes>
          <Route path="/login">
            {isLoggedIn ? <Navigate to="/main" /> : <Login />}
          </Route>
          <Route path="/main">
            {isLoggedIn ? <Main /> : <Navigate to="/login" />}
          </Route>
          <Route path="/profile">
            {isLoggedIn ? <Profile /> : <Navigate to="/login" />}
          </Route>
          <Route exact path="/">
            <Navigate to="/login" />
          </Route>
    </Routes>
  );
}

export default App;