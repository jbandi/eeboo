import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Callback extends Component {
  render() {
    return (
      <Grid className="home-content">
        <Row>
          <Col xs={4} md={4}></Col>
          <Col xs={4} md={4}>
            <div className="loader" />
          </Col>
          <Col xs={4} md={4}></Col>
        </Row>
      </Grid>
    );
  }
}

export default Callback;
