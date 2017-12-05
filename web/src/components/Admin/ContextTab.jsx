import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import idx from 'idx';

const toArray = list => (
  (list) ? Object.keys(list).map(q => list[q]) : []
);

export const ContextTab = props => (
  <Table responsive striped hover bordered>
    <thead>
      <tr>
        <th>Thema</th>
      </tr>
    </thead>
    <tbody>
      {toArray(props.questionaire.contexts).map(c => (
        <tr key={c.id}>
          <td>{idx(c, _ => _.contents[0].content) || 'no content'}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

ContextTab.propTypes = {
  questionaire: PropTypes.shape({
    id: PropTypes.number,
    contexts: PropTypes.shape({}),
  }).isRequired,
};

export default ContextTab;
