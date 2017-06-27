import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import logo from './logo.svg';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  state = {users: []}

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            <br />
            ..then be the happiest man..
          </p>
          <RaisedButton label="Default" />
          <h1>Users from API</h1>
          {this.state.users.map(user =>
            <div key={user.id}>{user.username}</div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
