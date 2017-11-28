import React from 'react';
import PropTypes from 'prop-types';
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
      </tr>
    </thead>
    <tbody>
      {toArray(props.questionaire.roles).map(r => (
        <tr key={r.id}>
          <td>{idx(r, _ => _.contents[0].content) || 'no content'}</td>
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
