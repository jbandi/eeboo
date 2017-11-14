import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import idx from 'idx';

import { getContentByLanguage } from '../../state/selectors/context';

const toArray = list => (
  Object.keys(list).map(q => list[q])
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
        <tr key={q.id}>
          <td>{idx(q, _ => _.contents[0].content) || 'no content'}</td>
          <td>{getContentByLanguage(props.questionaire.contexts, q.context, 'de').content}</td>
          <td className="td-center">{q.scores}</td>
          <td className="detail-link">
            <Link to="#">Edit</Link> |&nbsp;
            <Link
              to="#"
              onClick={() => props.deleteQuestion({
                procId: props.procId,
                questionaireId: props.questionaire.id,
                questionId: q.id,
              })}
            >Delete</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

QuestionTab.propTypes = {
  questionaire: PropTypes.shape({
    id: PropTypes.number,
    questions: PropTypes.shape({}),
    contexts: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default QuestionTab;
