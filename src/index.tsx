// import React from 'react';
import { StrictMode } from 'react';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';
// import ReactDOM from 'react-dom/client';
var ReactDOM = require('react-dom/client');

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
      <App />
  </StrictMode>
);

reportWebVitals();