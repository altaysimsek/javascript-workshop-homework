import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';
import './scss/index.scss';

import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);


