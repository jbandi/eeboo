import { connect } from 'react-redux';
import Badge from '../../components/Feedbacker/Badge';
import { getQuestionsByContextId, countAnswersByContextId } from '../../state/selectors/questionaire';
import { getFeedbackerAnswers, getFirstFeedbackerProc, getFirstFeedbackerId } from '../../state/selectors/feedbacker';
import { getQuestionaire } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  total: getQuestionsByContextId(
    getQuestionaire(state, getFirstFeedbackerProc(state), 1234).questions,
    ownProps.contextId,
    ownProps.roleId,
    'de',
  ).length,
  done: countAnswersByContextId(
    getQuestionaire(state, getFirstFeedbackerProc(state), 1234).questions,
    getFeedbackerAnswers(state, getFirstFeedbackerId(state), ownProps.clientId),
    ownProps.contextId, ownProps.roleId,
    'de',
  ),
});

export default connect(mapStateToProps)(Badge);
