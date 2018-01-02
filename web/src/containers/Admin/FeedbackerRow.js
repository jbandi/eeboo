import { connect } from 'react-redux';
import { FeedbackerRow } from '../../components/Admin/FeedbackerRow';
import { getRoleIdByClientId } from '../../state/selectors/feedbacker';
import { getRoleById } from '../../state/selectors/questionaire';
import { getQuestionaire } from '../../state/selectors/process';
import { deleteFeedbackerFromBackend } from '../../state/actions/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  feedbacker: ownProps.feedbacker,
  role: getRoleById(
    getQuestionaire(state, ownProps.feedbacker.proc, 1234),
    getRoleIdByClientId(state, ownProps.feedbacker.id, ownProps.clientId),
    'de',
  ),
});

const mapDispatchToProps = dispatch => ({
  deleteFeedbacker: (id) => {
    dispatch(deleteFeedbackerFromBackend(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackerRow);
