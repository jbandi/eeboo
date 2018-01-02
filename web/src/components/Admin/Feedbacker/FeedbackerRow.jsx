import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Badge from '../../Badge';

const createLink = id => (
  `/feedbacker/${id}`
);

export const FeedbackerRow = (props) => {
  const {
    feedbacker, numClients, numAnswers, numQuestions,
  } = props;
  return (
    <tr>
      <td>
        <Link target="_blank" to={createLink(feedbacker.id)}>{feedbacker.id}</Link>
      </td>
      <td>{feedbacker.mail}</td>
      <td className="td-center">{numClients}</td>
      <td className="td-center"><Badge total={numQuestions * numClients} done={numAnswers} /></td>
      <td className="detail-link">
        <Link to="#" onClick={() => props.deleteFeedbacker(feedbacker.id)}>Delete</Link>
      </td>
    </tr>
  );
};

FeedbackerRow.propTypes = {
  feedbacker: PropTypes.shape({
    id: PropTypes.string,
    mail: PropTypes.string,
  }).isRequired,
  deleteFeedbacker: PropTypes.func.isRequired,
  numQuestions: PropTypes.number.isRequired,
  numClients: PropTypes.number.isRequired,
  numAnswers: PropTypes.number.isRequired,
};

export default FeedbackerRow;
