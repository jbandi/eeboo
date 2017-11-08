import { connect } from 'react-redux';
import QuestionaireDetail from '../../components/Admin/QuestionaireDetail';
import { getQuestionaire } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  questionaire: getQuestionaire(state, ownProps.procId, ownProps.questionaireId),
});

export default connect(mapStateToProps)(QuestionaireDetail);
