import React from 'react';
import PropTypes from 'prop-types';

export const FeedbackerRow = props => (
  <tr>
    <td>{props.feedbacker.id}</td>
    <td>{props.feedbacker.mail}</td>
    <td>{props.feedbacker.gender}</td>
    <td>{props.role.content}</td>
  </tr>
);

FeedbackerRow.propTypes = {
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
