import React from 'react';
import PropTypes from 'prop-types';

export const RoleRow = props => (
  <tr>
    <td>{props.role.content}</td>
  </tr>
);

RoleRow.propTypes = {
  role: PropTypes.shape({
    content: PropTypes.string,
  }).isRequired,
};

export default RoleRow;
