import { connect } from 'react-redux';
import {
  getFirstFeedbackerProc,
  getFirstFeedbackerId,
  getRoleIdByClientId,
} from '../../state/selectors/feedbacker';
import { getQuestionaire, getContextsArray, getClient, getLanguage } from '../../state/selectors/process';
import { getRoleById } from '../../state/selectors/questionaire';
import { Client } from '../../components/Feedbacker/Client';
import { postFeedbacker, clearAnswers } from '../../state/actions/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  contextList: getContextsArray(state, getFirstFeedbackerProc(state), 1234),
  feedbackerId: getFirstFeedbackerId(state),
  client: getClient(state, getFirstFeedbackerProc(state), ownProps.clientId),
  role: getRoleById(
    getQuestionaire(state, getFirstFeedbackerProc(state), 1234),
    getRoleIdByClientId(state, getFirstFeedbackerId(state), ownProps.clientId),
    getLanguage(state, getFirstFeedbackerProc(state)),
  ),
  language: getLanguage(getFirstFeedbackerProc(state)),
});

const mapDispatchToProps = dispatch => ({
  clearAnswers: (feedbackerId, clientId) => { dispatch(clearAnswers(feedbackerId, clientId)); },
  saveAnswers: () => { dispatch(postFeedbacker()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
