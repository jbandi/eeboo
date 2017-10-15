import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import eeboo from './state/reducers';

const store = createStore(
  eeboo,
  applyMiddleware(thunk),
);

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  ), document.getElementById('root'),
);

registerServiceWorker();
