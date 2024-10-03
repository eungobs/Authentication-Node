import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated to import createRoot from react-dom/client
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the app inside the root
root.render(
  <Router>
    <App />
  </Router>
);

