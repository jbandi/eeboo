import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const createLink = id => (
  `/feedbacker/${id}`
);

export const FeedbackerRow = props => (
  <tr>
    <td><Link target="_blank" to={createLink(props.feedbacker.id)}>{props.feedbacker.id}</Link></td>
    <td>{props.feedbacker.mail}</td>
    <td>{props.feedbacker.gender}</td>
    <td>{props.role.content}</td>
    <td className="detail-link">
      <Link to="#" onClick={() => props.deleteFeedbacker(props.auth, props.feedbacker.id)}>Delete</Link>
    </td>
  </tr>
);

FeedbackerRow.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  deleteFeedbacker: PropTypes.func.isRequired,
  feedbacker: PropTypes.shape({
    id: PropTypes.string,
    mail: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
  role: PropTypes.shape({
    content: PropTypes.string,
  }).isRequired,
};

export default FeedbackerRow;
