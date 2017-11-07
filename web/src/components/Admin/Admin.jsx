import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Auth from './../../services/Auth/Auth';
import ProcessList from './../../containers/Admin/ProcessList';

class Admin extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    return (
      <div>
        <ProcessList {...this.props} />
      </div>
    );
  }
}

export default Admin;
