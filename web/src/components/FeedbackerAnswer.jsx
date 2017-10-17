import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

const FeedbackerAnswer = (props) => {
  const rows = [];
  for (let i = 1; i <= props.maxScore; i += 1) {
    rows.push(<Button
      key={`${props.questionId}-${i}`}
      onClick={() => props.updateAnswer({
        id: 1, // TODO: this is the feedbacker id
        questionId: props.questionId,
        score: i,
      })}
      active={i === props.score}
    >{i}</Button>);
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
};

FeedbackerAnswer.defaultProps = {
  score: -1,
};

export default FeedbackerAnswer;
