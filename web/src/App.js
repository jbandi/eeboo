import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './components/Main';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
        <div className="App">
          <Main />
        </div>
    );
  }
}

export default App;
