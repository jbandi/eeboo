import React from 'react';
import PropTypes from 'prop-types';
import FeedbackerAnswer from './../../containers/Feedbacker/FeedbackerAnswer';

export const FeedbackerQuestionsRow = props => (
  <tr key={props.question.id}>
    <td align="center">{props.content}</td>
    <td align="align-right">
      <FeedbackerAnswer
        questionId={props.question.id}
        maxScore={props.question.scores}
        clientId={props.client.id}
      />
    </td>
  </tr>
);

FeedbackerQuestionsRow.propTypes = {
  content: PropTypes.string.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string,
    scores: PropTypes.number,
  }).isRequired,
  client: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    firstname: PropTypes.string,
  }).isRequired,
};

export default FeedbackerQuestionsRow;
