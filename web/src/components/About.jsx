import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

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
                  <Button
                    onClick={this.login.bind(this)} >
                    Login
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                <Button
                  onClick={this.logout.bind(this)} >
                  Logout
                </Button>
                )
            }
      </div>
    );
  }
}

export default About;
