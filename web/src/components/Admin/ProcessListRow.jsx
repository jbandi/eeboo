import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ProcessListRow = props => (
  <tr>
    <td>
      {props.process.id}
    </td>
    <td>
      {props.process.company}
    </td>
    <td>
      <Button onClick={() => this.props.setId(1)}>Details</Button>
    </td>
  </tr>
);

ProcessListRow.propTypes = {
  process: PropTypes.shape({
    id: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProcessListRow;
