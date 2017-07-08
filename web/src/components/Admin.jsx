import React, { Component } from 'react';
import { Row, Col, Grid, Image } from 'react-bootstrap';

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
      <Grid className="home-content">
        <Row>
          <Col xs={6} md={2}></Col>
          <Col xs={6} md={8}>
            <h1>{profile.nickname}</h1>
            <Image src={profile.picture} circle/>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Col>
          <Col xsHidden md={2}></Col>
        </Row>
      </Grid>
    )
  }
}

export default Admin;
