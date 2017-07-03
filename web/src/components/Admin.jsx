import React, { Component } from 'react';

class Admin extends Component {


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
    const { profile } = this.state;
    return(
      <div>
        <h1>admin</h1>

        <h2>{profile.name}</h2>
        <h3>{profile.nickname}</h3>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

      </div>
    )
  }
}

export default Admin;
