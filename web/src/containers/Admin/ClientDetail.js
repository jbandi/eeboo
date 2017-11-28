import { connect } from 'react-redux';
import ClientDetail from '../../components/Admin/ClientDetail';
import { importFeedbackers, postFeedbacker } from '../../state/actions/feedbacker';
import { getClient } from '../../state/selectors/process';
import { getFeedbackersByClientId } from '../../state/selectors/feedbacker';

function saveFeedbackers(dispatch, feedbackers) {
  feedbackers.forEach(f => dispatch(postFeedbacker(f)));
}

const mapStateToProps = (state, ownProps) => ({
  client: getClient(state, ownProps.params.match.params.id, ownProps.params.match.params.clientId),
  feedbackerList: getFeedbackersByClientId(state, ownProps.params.match.params.clientId),
  procId: ownProps.params.match.params.id,
});

const mapDispatchToProps = dispatch => ({
  handleFileUpload: (data, procId, clientId) => {
    dispatch(importFeedbackers(data, procId, clientId));
  },
  saveFeedbackers: (feedbackers) => { saveFeedbackers(dispatch, feedbackers); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetail);
