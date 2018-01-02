import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const ProcessData = props => (
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
);

ProcessData.propTypes = {
  process: PropTypes.shape({
    id: PropTypes.string,
    company: PropTypes.string,
    start: PropTypes.number,
    end: PropTypes.number,
  }).isRequired,
};

export default ProcessData;
