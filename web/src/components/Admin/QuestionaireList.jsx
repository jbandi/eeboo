import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import QuestionaireDetail from './../../containers/Admin/QuestionaireDetail';

const QuestionaireList = props => (
  <div>
    <p align="right">
      <Link to="#">import</Link>
    </p>
    {props.questionaires.map(q => (
      <QuestionaireDetail key={q.id} questionaireId={q.id} procId={props.procId} />
    ))}
  </div>
);

QuestionaireList.propTypes = {
  procId: PropTypes.string.isRequired,
  questionaires: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default QuestionaireList;
