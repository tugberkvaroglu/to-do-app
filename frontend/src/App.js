import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Main from './components/main';
import Profile from './components/profile';

function App() {
  
  const isLoggedIn = !!localStorage.getItem('userID'); // Check if user is logged in

  return (
    <Routes>
      <div>
        <Switch>
          <Route path="/login">
            {isLoggedIn ? <Redirect to="/main" /> : <Login />}
          </Route>
          <Route path="/main">
            {isLoggedIn ? <Main /> : <Redirect to="/login" />}
          </Route>
          <Route path="/profile">
            {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Routes>
  );
}

export default App;