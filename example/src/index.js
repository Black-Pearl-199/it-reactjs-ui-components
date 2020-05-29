import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../../src/assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
