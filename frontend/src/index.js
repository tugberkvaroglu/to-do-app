import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';

const container = document.getElementById('App');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.error("Could not find root element with ID 'App'");
}
