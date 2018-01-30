import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ErrorBoundary from './components/ErrorBoundary';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

import eeboo from './state/reducers';

const store = createStore(
  eeboo,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
  applyMiddleware(thunk),
);

ReactDOM.render(
  (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  ), document.getElementById('root'),
);

// registerServiceWorker();
