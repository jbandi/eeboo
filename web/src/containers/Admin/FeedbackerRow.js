import { connect } from 'react-redux';
import { FeedbackerRow } from '../../components/Admin/FeedbackerRow';
import { getRoleIdByClientId } from '../../state/selectors/feedbacker';
import { getRoleById } from '../../state/selectors/questionaire';
import { getQuestionaire } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  feedbacker: ownProps.feedbacker,
  role: getRoleById(
    getQuestionaire(state, ownProps.feedbacker.proc, 1234),
    getRoleIdByClientId(ownProps.feedbacker, ownProps.clientId), 'de'),
});

export default connect(mapStateToProps)(FeedbackerRow);
