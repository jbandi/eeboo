import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Button, Jumbotron } from 'react-bootstrap';
import FeedbackerQuestions from '../containers/FeedbackerQuestions';

const Home = (props) => {
  console.log(props.feedbackerId);
  if (props.feedbackerId === '') {
    return (
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
  }
  return (
    <div>
      <Grid className="home-content">
        <Row>
          <Col xs={6} md={2} />
          <Col xs={6} md={8}>
            <Button bsStyle="primary" onClick={props.onClick}>Get Company Data</Button>
          </Col>
          <Col xsHidden md={2} />
        </Row>
        <Row>
          <Col xs={6} md={2} />
          <Col xs={6} md={8}>
            {props.company.id} <br />
            {props.company.name} <br />
            {props.company.mail} <br />
            {props.company.color} <br />
            {props.company.lastUpdated} <br />
          </Col>
          <Col xs={6} md={2} />
        </Row>
        <Row>
          { props.contextIds.map(el =>
            <FeedbackerQuestions key={el} contextId={el} />)
          }
        </Row>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  contextIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  feedbackerId: PropTypes.string,
};

Home.defaultProps = {
  feedbackerId: '',
};

export default Home;
