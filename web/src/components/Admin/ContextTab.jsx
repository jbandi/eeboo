import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import idx from 'idx';

const toArray = list => (
  Object.keys(list).map(q => list[q])
);

export const ContextTab = props => (
  <Table responsive striped hover bordered>
    <thead>
      <tr>
        <th>Thema</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {toArray(props.questionaire.contexts).map(c => (
        <tr key={c.id}>
          <td>{idx(c, _ => _.contents[0].content) || 'no content'}</td>
          <td className="detail-link"><Link to="#">Edit</Link> | <Link to="#">Delete</Link></td>
        </tr>
      ))}
    </tbody>
  </Table>
);

ContextTab.propTypes = {
  questionaire: PropTypes.shape({
    id: PropTypes.number,
    contexts: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default ContextTab;
