import React from 'react';
import ReactDOM from 'react-dom/client';

// import LogRocket from 'logrocket';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// LogRocket.init('aqn6sg/realtor-app');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
