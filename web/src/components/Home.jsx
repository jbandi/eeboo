import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';

const Home = () => (
  <div>
    <Row>
      <Col md={2} />
      <Col md={8}>
        <Jumbotron>
          <h1>270 Grad Analyse</h1>
          <p>Hier entsteht ein 270-Grad Feedbackanalyse Tool im Rahmen einer Masterarbeit an
          im Bereich Softwareentwicklung der BFH Bern</p>
        </Jumbotron>
      </Col>
      <Col md={2} />
    </Row>
  </div>
);


export default Home;
