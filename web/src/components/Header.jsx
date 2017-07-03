import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom'

class Header extends Component {

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated, userHasScopes } = this.props.auth;
    return(
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text=" ..eeboo.com" />
        </ToolbarGroup>
        <ToolbarGroup>
          <div>
          <FlatButton
            label="Home"
            primary={true}
            containerElement={<Link to="/"/>}
          />
          {
            isAuthenticated() &&  userHasScopes(['profile']) && (
              <FlatButton
                label="Admin"
                primary={true}
                containerElement={<Link to="/admin"/>}
              />
            )
          }
          {
            !isAuthenticated() && (
                <FlatButton
                  label="Login"
                  primary={true}
                  onClick={this.login.bind(this)}
                />
              )
          }
          {
            isAuthenticated() && (
              <FlatButton
                label="Logout"
                primary={true}
                onClick={this.logout.bind(this)}
              />
              )
          }
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default Header;
