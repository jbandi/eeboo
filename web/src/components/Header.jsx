import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from './../services/history';
import Auth from './../services/Auth/Auth';
import RouteNavItem from './RouteNavItem';

class Header extends Component {
  propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  handleNavLink = (event) => {
    event.preventDefault();
    history.replace(event.currentTarget.getAttribute('href'));
  }

  render() {
    const { isAuthenticated, userHasRoles } = this.props.auth;
    return (
      <header className="app-header">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">eeboo</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <RouteNavItem onClick={this.handleNavLink} href="/">Home</RouteNavItem>
              <RouteNavItem onClick={this.handleNavLink} href="/about">About</RouteNavItem>
              {
                isAuthenticated() && userHasRoles(['admin']) && (
                  <RouteNavItem onClick={this.handleNavLink} href="/admin">Admin</RouteNavItem>
                )
              }
              {
                !isAuthenticated() && (
                  <RouteNavItem onClick={this.login.bind(this)} href="#">Login</RouteNavItem> // eslint-disable-line react/jsx-no-bind
                )
              }
              {
                isAuthenticated() && (
                  <RouteNavItem onClick={this.logout.bind(this)} href="#">Logout</RouteNavItem> // eslint-disable-line react/jsx-no-bind
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
