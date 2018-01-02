import { connect } from 'react-redux';
import { FeedbackerRow } from '../../../components/Admin/Feedbacker/FeedbackerRow';
import { deleteFeedbackerFromBackend } from '../../../state/actions/feedbacker';
import { getFeedbackerClientIds, getNumAnswers } from '../../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  numClients: getFeedbackerClientIds(state, ownProps.feedbacker.id).length,
  numAnswers: getNumAnswers(state, ownProps.feedbacker.id),
});

const mapDispatchToProps = dispatch => ({
  deleteFeedbacker: (id) => {
    dispatch(deleteFeedbackerFromBackend(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackerRow);
