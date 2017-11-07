import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProcessListRow = props => (
  <tr>
    <td>
      {props.process.id}
    </td>
    <td>
      {props.process.company}
    </td>
    <td>
      {props.process.start}
    </td>
    <td>
      {props.process.end}
    </td>
    <td>
      {props.process.state}
    </td>
    <td className="detail-link">
      <Link to={`admin/proc/${props.process.id}/questionaires`}>Details</Link>
    </td>
  </tr>
);

ProcessListRow.propTypes = {
  process: PropTypes.shape({
    id: PropTypes.string,
    company: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
};

export default ProcessListRow;
