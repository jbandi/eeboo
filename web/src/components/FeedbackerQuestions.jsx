import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const FeedbackerQuestions = props => (
  <Panel header={props.contextContent.content}>
    {props.questions.map(question =>
      (
        <div key={question.id}>
          {question.contents[0].content}:&nbsp;score=
          <b>{question.scores}</b>
        </div>))
    }
  </Panel>
);

FeedbackerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  contextContent: PropTypes.shape({
    lan: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default FeedbackerQuestions;
