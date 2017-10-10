import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from './../services/Auth/Auth';

class About extends Component {
  propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }
  componentWillMount() {
    this.setState({});
    const { authFetch } = this.props.auth;
    const API_URL = '/api';
    authFetch(`${API_URL}/private`)
      .then(data => this.setState({ message: data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return (
      <div>
        <pre>{this.state.message}</pre>
      </div>
    );
  }
}

export default About;
