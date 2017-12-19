import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import QuestionRow from '../../containers/Admin/QuestionRow';

const toArray = list => (
  (list) ? Object.keys(list).map(q => list[q]) : []
);

export const QuestionTab = props => (
  <Table responsive striped hover bordered>
    <thead>
      <tr>
        <th>Frage</th>
        <th>Thema</th>
        <th>Skore</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody>
      {toArray(props.questionaire.questions).map(q => (
        <QuestionRow
          question={q}
          procId={props.procId}
          key={q.id}
          questionaire={props.questionaire}
        />
      ))}
    </tbody>
  </Table>
);

QuestionTab.propTypes = {
  questionaire: PropTypes.shape({
    id: PropTypes.number,
    questions: PropTypes.shape({}),
    contexts: PropTypes.shape({}),
  }).isRequired,
  procId: PropTypes.string.isRequired,
};

export default QuestionTab;
