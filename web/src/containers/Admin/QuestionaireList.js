import { connect } from 'react-redux';
import QuestionaireList from '../../components/Admin/QuestionaireList';
import { getQuestionaires } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  questionaires: getQuestionaires(state, ownProps.procId),
});

export default connect(mapStateToProps)(QuestionaireList);
