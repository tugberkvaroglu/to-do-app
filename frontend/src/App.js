import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Main from './components/main';
import Profile from './components/profile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/main" component={Main} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={Login} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;