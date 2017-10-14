import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const FeedbackerQuestions = props => (
  <Panel header={props.contextId}>
    {props.questions.map(question =>
      (
        <div key={question.id}>
          <b >{question.id}</b><br />
          <b>{question.scores}</b>
        </div>))
    }
  </Panel>
);

FeedbackerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contextId: PropTypes.number.isRequired,
};

export default FeedbackerQuestions;
