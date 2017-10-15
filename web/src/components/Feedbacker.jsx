import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Button } from 'react-bootstrap';
import FeedbackerQuestions from '../containers/FeedbackerQuestions';

const Feedbacker = props => (
  <div>
    <Grid className="home-content">
      <Row>
        {props.location.pathname}
      </Row>
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

Feedbacker.propTypes = {
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

Feedbacker.defaultProps = {
  feedbackerId: '',
};

export default Feedbacker;
