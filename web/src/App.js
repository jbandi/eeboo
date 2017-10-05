import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './components/Main';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <div className="App">
    <Main />
  </div>
);

export default App;
