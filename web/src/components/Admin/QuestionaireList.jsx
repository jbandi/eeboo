import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import QuestionaireDetail from './../../containers/Admin/QuestionaireDetail';

export class QuestionaireList extends React.Component {
  static propTypes = {
    procId: PropTypes.string.isRequired,
    questionaires: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleFileUpload: PropTypes.func.isRequired,
  };

  focusTextInput = (e) => {
    e.preventDefault();
    this.input.click();
  }

  render() {
    return (
      <div>
        <div align="right">
          <input
            style={{ display: 'none' }}
            id="import"
            type="file"
            accept=".csv"
            ref={(ref) => { this.input = ref; }}
            onChange={d => this.props.handleFileUpload(d, this.props.procId)}
          />
          <Link to="#" onClick={this.focusTextInput}>import</Link>
        </div>
        {this.props.questionaires.map(q => (
          <QuestionaireDetail key={q.id} questionaireId={q.id} procId={this.props.procId} />
        ))}
      </div>
    );
  }
}

export default QuestionaireList;
