import { connect } from 'react-redux';
import Badge from '../../components/Feedbacker/Badge';
import { getQuestionsByContextId, countAnswersByContextId } from '../../state/selectors/questionaire';
import { getFeedbackerAnswers } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  total: getQuestionsByContextId(
    state.feedbacker.proc.questionaires[1234].questions,
    ownProps.contextId,
    ownProps.roleId,
    state.feedbacker.language,
  ).length,
  done: countAnswersByContextId(
    state.feedbacker.proc.questionaires[1234].questions,
    getFeedbackerAnswers(state, ownProps.clientId),
    ownProps.contextId, ownProps.roleId,
    state.feedbacker.language,
  ),
});

export default connect(mapStateToProps)(Badge);
