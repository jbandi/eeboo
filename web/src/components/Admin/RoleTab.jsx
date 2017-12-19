import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import RoleRow from '../../containers/Admin/RoleRow';

const toArray = list => (
  Object.keys(list).map(q => list[q])
);

export const RoleTab = props => (
  <Table responsive striped hover bordered>
    <thead>
      <tr>
        <th>Rolle</th>
      </tr>
    </thead>
    <tbody>
      {toArray(props.questionaire.roles).map(r => (
        <RoleRow key={r.id} questionaire={props.questionaire} role={r} />
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
