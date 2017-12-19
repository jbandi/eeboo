import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import FeedbackerQuestionsRow from '../../containers/Feedbacker/FeedbackerQuestionsRow';

const FeedbackerQuestions = props => (
  <div>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Frage</th>
          <th>Antwort</th>
        </tr>
      </thead>
      <tbody>
        {props.questions.map(question =>
          (
            <FeedbackerQuestionsRow
              key={question.id}
              question={question}
              client={props.client}
              role={props.role}
            />
          ))
        }
      </tbody>
    </Table>
  </div>
);

FeedbackerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  client: PropTypes.shape({}).isRequired,
  role: PropTypes.shape({}).isRequired,
};

export default FeedbackerQuestions;
