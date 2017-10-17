import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import FeedbackerAnswer from './../containers/FeedbackerAnswer';

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
            <tr key={question.id}>
              <td align="center">{question.contents[0].content}</td>
              <td align="align-right"><FeedbackerAnswer questionId={question.id} maxScore={5} /></td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  </div>
);

FeedbackerQuestions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FeedbackerQuestions;
