import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import idx from 'idx';

const toArray = list => (
  Object.keys(list).map(q => list[q])
);

export const RoleTab = props => (
  <Table responsive striped hover bordered>
    <thead>
      <tr>
        <th>Rolle</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {toArray(props.questionaire.roles).map(r => (
        <tr key={r.id}>
          <td>{idx(r, _ => _.contents[0].content) || 'no content'}</td>
          <td className="detail-link"><Link to="#">Edit</Link> | <Link to="#">Delete</Link></td>
        </tr>
      ))}
    </tbody>
  </Table>
);

RoleTab.propTypes = {
  questionaire: PropTypes.shape({
    id: PropTypes.number,
    roles: PropTypes.shape({}),
  }).isRequired,
};

export default RoleTab;
