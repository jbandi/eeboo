import { connect } from 'react-redux';
import QuestionaireDetail from '../../../components/Admin/Questionaire/QuestionaireDetail';
import { getQuestionaire } from '../../../state/selectors/process';
import { updateProc } from '../../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  questionaire: getQuestionaire(state, ownProps.procId, ownProps.questionaireId),
});

const mapDispatchToProps = dispatch => ({
  save: (procId) => {
    dispatch(updateProc(procId));
  },
}
);

export default connect(mapStateToProps, mapDispatchToProps)(QuestionaireDetail);
