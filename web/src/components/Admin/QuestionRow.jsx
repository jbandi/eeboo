import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const QuestionRow = props => (
  <tr key={props.question.id}>
    <td>{props.questionContent}</td>
    <td>{props.context}</td>
    <td className="td-center">{props.question.scores}</td>
    <td className="detail-link">
      <Link to="#">Edit</Link> |&nbsp;
      <Link
        to="#"
        onClick={() => props.deleteQuestion({
          procId: props.procId,
          questionaireId: props.questionaire.id,
          questionId: props.question.id,
        })}
      >Delete
      </Link>
    </td>
  </tr>
);

QuestionRow.propTypes = {
  context: PropTypes.string,
  questionContent: PropTypes.string.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string,
    scores: PropTypes.number,
  }).isRequired,
  procId: PropTypes.string.isRequired,
  questionaire: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

QuestionRow.defaultProps = {
  context: 'no context',
};

export default QuestionRow;
