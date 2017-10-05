import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Callback = () => (
  <Grid className="home-content">
    <Row>
      <Col xs={4} md={4} />
      <Col xs={4} md={4}>
        <div className="loader" />
      </Col>
      <Col xs={4} md={4} />
    </Row>
  </Grid>
);


export default Callback;
