import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// const express = require('express');
// const app = express();

// let PORT = 5000;
// app.listen(PORT, () => {
//   console.log('Server is running');
// });

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);