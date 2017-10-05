import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Image } from 'react-bootstrap';
import Auth from './../services/Auth/Auth';

class Admin extends Component {
  propTypes = {
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
    const { profile } = this.state;
    return (
      <Grid className="home-content">
        <Row>
          <Col xs={6} md={2} />
          <Col xs={6} md={8}>
            <h1>{profile.nickname}</h1>
            <Image src={profile.picture} circle />
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Col>
          <Col xsHidden md={2} />
        </Row>
      </Grid>
    );
  }
}

export default Admin;
