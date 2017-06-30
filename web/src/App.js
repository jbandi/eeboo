import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import Header from './components/Header';
import Main from './components/Main';

import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header />
          <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
