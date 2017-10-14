import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import eeboo from './state/reducers';

const store = createStore(eeboo);

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'),
);

registerServiceWorker();
