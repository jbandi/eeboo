import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';


const ProcessDataShow = props => (
  <div>
    <div align="right"><Link to={{ pathname: `/admin/proc/${props.process.id}/data`, query: JSON.stringify({ mode: 'edit' }) }}>edit</Link></div>
    <Table responsive striped hover bordered>
      <tbody>
        <tr>
          <td>Id</td>
          <td>{props.process.id}</td>
        </tr>
        <tr>
          <td>Company</td>
          <td>{props.process.company}</td>
        </tr>
        <tr>
          <td>start</td>
          <td>{moment(props.process.start).format('DD.MM.YYYY')}</td>
        </tr>
        <tr>
          <td>end</td>
          <td>{moment(props.process.end).format('DD.MM.YYYY')}</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

ProcessDataShow.propTypes = {
  process: PropTypes.shape({
    id: PropTypes.string,
    company: PropTypes.string,
    start: PropTypes.number,
    end: PropTypes.number,
  }).isRequired,
};

export default ProcessDataShow;
