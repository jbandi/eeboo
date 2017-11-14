import { connect } from 'react-redux';
import QuestionaireDetail from '../../components/Admin/QuestionaireDetail';
import { getQuestionaire } from '../../state/selectors/process';
import { deleteQuestion, updateProc } from '../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  questionaire: getQuestionaire(state, ownProps.procId, ownProps.questionaireId),
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: (data) => {
    dispatch(deleteQuestion(data.procId, data.questionaireId, data.questionId));
  },
  save: (procId) => {
    dispatch(updateProc(procId));
  } }
);

export default connect(mapStateToProps, mapDispatchToProps)(QuestionaireDetail);
