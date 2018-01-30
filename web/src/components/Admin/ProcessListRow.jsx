import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import './datepicker.css';

const ProcessListRow = props => (
  <tr>
    <td>
      {props.process.id}
    </td>
    <td>
      {props.process.company}
    </td>
    <td>
      {moment(props.process.start).format('DD.MM.YYYY')}
    </td>
    <td>
      {moment(props.process.end).format('DD.MM.YYYY')}
    </td>
    <td>
      {props.process.state}
    </td>
    <td className="detail-link">
      <Link to={`admin/proc/${props.process.id}/questionaires`}>Details</Link> |&nbsp;
      <Link to="/admin" onClick={() => props.deleteProc(props.auth, props.process.id)}>Löschen</Link>
    </td>
  </tr>
);

ProcessListRow.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  process: PropTypes.shape({
    id: PropTypes.string,
    company: PropTypes.string,
    start: PropTypes.number,
    end: PropTypes.number,
    state: PropTypes.string,
  }).isRequired,
  deleteProc: PropTypes.func.isRequired,
};

export default ProcessListRow;
