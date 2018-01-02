import { connect } from 'react-redux';
import { QuestionaireList } from '../../../components/Admin/Questionaire/QuestionaireList';
import { getQuestionaires } from '../../../state/selectors/process';
import { importQuestions } from '../../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  questionaires: getQuestionaires(state, ownProps.procId),
});

const mapDispatchToProps = dispatch => ({
  handleFileUpload: (data, procId) => { dispatch(importQuestions(data, procId)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionaireList);
