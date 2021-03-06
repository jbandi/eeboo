import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from './../services/Auth/Auth';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated, userHasRoles } = this.props.auth;
    return (
      <header className="app-header">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">eeboo</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/home">
                <NavItem eventKey={1}>Home</NavItem>
              </LinkContainer>
              {
                isAuthenticated() && userHasRoles(['admin']) && (
                  <LinkContainer to="/admin">
                    <NavItem eventKey={3}>Prozesse</NavItem>
                  </LinkContainer>
                )
              }
              {
                !isAuthenticated() && (
                  <LinkContainer to="#">
                    <NavItem onClick={this.login} eventKey={3}>Login</NavItem>
                  </LinkContainer>
                )
              }
              {
                isAuthenticated() && (
                  <LinkContainer to="#">
                    <NavItem onClick={this.logout} eventKey={3}><div className="glyphicon glyphicon-log-out" /></NavItem>
                  </LinkContainer>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
