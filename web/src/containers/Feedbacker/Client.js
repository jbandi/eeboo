import { connect } from 'react-redux';
import {
  getFirstFeedbackerProc,
  getFirstFeedbackerId,
  getRoleIdByClientId,
} from '../../state/selectors/feedbacker';
import { getQuestionaire, getContexts, getClient } from '../../state/selectors/process';
import { getRolesByLanguage, getRoleById } from '../../state/selectors/questionaire';
import { Client } from '../../components/Feedbacker/Client';
import { postFeedbacker, clearAnswers } from '../../state/actions/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  contextList: getContexts(state, getFirstFeedbackerProc(state), 1234),
  feedbackerId: getFirstFeedbackerId(state),
  client: getClient(state, getFirstFeedbackerProc(state), ownProps.clientId),
  roles: getRolesByLanguage(
    getQuestionaire(state, getFirstFeedbackerProc(state), 1234),
    state.feedbacker.language,
  ),
  role: getRoleById(
    getQuestionaire(state, getFirstFeedbackerProc(state), 1234),
    getRoleIdByClientId(state, getFirstFeedbackerId(state), ownProps.clientId),
    'de',
  ),
});

const mapDispatchToProps = dispatch => ({
  clearAnswers: (feedbackerId, clientId) => { dispatch(clearAnswers(feedbackerId, clientId)); },
  saveAnswers: () => { dispatch(postFeedbacker()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
