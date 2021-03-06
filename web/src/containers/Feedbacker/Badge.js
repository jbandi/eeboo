import { connect } from 'react-redux';
import Badge from '../../components/Badge';
import { getQuestionsByContextId, countAnswersByContextId } from '../../state/selectors/questionaire';
import { getFeedbackerAnswers, getFirstFeedbackerProc, getFirstFeedbackerId } from '../../state/selectors/feedbacker';
import { getQuestionaire } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  total: getQuestionsByContextId(
    getQuestionaire(state, getFirstFeedbackerProc(state), 1234).questions,
    ownProps.contextId,
  ).length,
  done: countAnswersByContextId(
    getQuestionaire(state, getFirstFeedbackerProc(state), 1234).questions,
    getFeedbackerAnswers(state, getFirstFeedbackerId(state), ownProps.clientId),
    ownProps.contextId,
  ),
});

export default connect(mapStateToProps)(Badge);
