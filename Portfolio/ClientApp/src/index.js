import '@material-ui/core';
import '@material-ui/icons';
import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

/*const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"; //semanticui https://react.semantic-ui.com/
//styleLink.href = "https://unpkg.com/@material-ui/core@4.3.1/umd/material-ui.production.min.js"; //material ui
document.head.appendChild(styleLink);*/



ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
