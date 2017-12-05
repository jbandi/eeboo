import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

const FeedbackerAnswer = (props) => {
  const rows = [];
  for (let i = 1; i <= props.maxScore; i += 1) {
    rows.push(<Button
      key={`${props.questionId}-${i}`}
      onClick={() => props.updateAnswer({
                        clientId: props.clientId,
                        questionId: props.questionId,
                        score: i,
                        feedbackerId: props.feedbackerId,
                      })}
      active={i === props.score}
    >{i}
    </Button>); // eslint-disable-line
  }
  return (
    <ButtonToolbar>
      <ButtonGroup bsSize="small">
        {rows}
      </ButtonGroup>
    </ButtonToolbar>
  );
};

FeedbackerAnswer.propTypes = {
  questionId: PropTypes.string.isRequired,
  maxScore: PropTypes.number.isRequired,
  score: PropTypes.number,
  updateAnswer: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  feedbackerId: PropTypes.string.isRequired,
};

FeedbackerAnswer.defaultProps = {
  score: -1,
};

export default FeedbackerAnswer;
