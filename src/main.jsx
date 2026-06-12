import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ReactGA from 'react-ga4';

// Initialize Google Analytics with your Measurement ID
ReactGA.initialize('G-21B8JDZ6YY'); 

// Send the initial pageview hit
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);