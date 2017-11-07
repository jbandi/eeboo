import React from 'react';
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
    <td>
      <a href={`/admin/proc/${props.process.id}/questionaires`}>Detail</a>
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
