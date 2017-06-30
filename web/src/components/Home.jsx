import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {

  state = { users: [] }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render () {
    return (
      <div>
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
    )
  }
}


export default Home;
