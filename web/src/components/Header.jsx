import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import history from './../services/history';
import RouteNavItem from './RouteNavItem';

import { Link } from 'react-router-dom';

class Header extends Component {

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
    return(
      <header className='app-header'>
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
              {
                isAuthenticated() &&  userHasRoles(['admin']) && (
                  <RouteNavItem onClick={this.handleNavLink} href="/admin">Admin</RouteNavItem>
                )
              }
              {
                !isAuthenticated() && (
                    <RouteNavItem onClick={this.login.bind(this)} href="#">Login</RouteNavItem>
                  )
              }
              {
                isAuthenticated() && (
                    <RouteNavItem onClick={this.logout.bind(this)} href="#">Logout</RouteNavItem>
                  )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

export default Header;
