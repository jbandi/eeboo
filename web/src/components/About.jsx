import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class About extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
            {
              !isAuthenticated() && (
                  <FlatButton
                    label="Login"
                    onClick={this.login.bind(this)}
                  />
                )
            }
            {
              isAuthenticated() && (
                <FlatButton
                  label="Logout"
                  onClick={this.logout.bind(this)}
                />
                )
            }
      </div>
    );
  }
}

export default About;
