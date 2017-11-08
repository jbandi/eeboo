import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Panel, Table, Button } from 'react-bootstrap';
import idx from 'idx';

const QuestionsToArray = list => (
  Object.keys(list).map(q => list[q])
);

const QuestionaireDetail = props => (
  <div>
    <Panel header={`Fragebogen: ${props.questionaire.id}`}>
      <Table bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Kontext</th>
            <th>Skore</th>
            <th>Inhalt</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {QuestionsToArray(props.questionaire.questions).map(q => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.context}</td>
              <td>{q.scores}</td>
              <td>{idx(q, _ => _.contents[0].content) || 'no content'}</td>
              <td className="detail-link"><Link to="#">Edit</Link> | <Link to="#">Delete</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p align="right">
        <Button>delete</Button>
      </p>
    </Panel>
  </div>
);

QuestionaireDetail.propTypes = {
  questionaire: PropTypes.shape({
    id: PropTypes.number,
    questions: PropTypes.shape({}),
  }).isRequired,
};

export default QuestionaireDetail;
