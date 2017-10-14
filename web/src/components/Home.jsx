import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Button } from 'react-bootstrap';

const Home = props => (
  <Grid className="home-content">
    <Row>
      <Col xs={6} md={2} />
      <Col xs={6} md={8}>
        <Button bsStyle="primary" onClick={props.onClick}>Get Company Data</Button>
      </Col>
      <Col xs={6} md={8}>
        {props.company.id} <br />
        {props.company.name} <br />
        {props.company.mail} <br />
        {props.company.color} <br />
        {props.company.lastUpdated} <br />
      </Col>
      <Col xsHidden md={2} />
    </Row>
  </Grid>
);

Home.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Home;
