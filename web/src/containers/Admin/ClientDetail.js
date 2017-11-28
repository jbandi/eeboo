import { connect } from 'react-redux';
import ClientDetail from '../../components/Admin/ClientDetail';
import { getClient } from '../../state/selectors/process';
import { getFeedbackersByClientId } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  client: getClient(state, ownProps.params.match.params.id, ownProps.params.match.params.clientId),
  feedbackerList: getFeedbackersByClientId(state, ownProps.params.match.params.clientId),
});

export default connect(mapStateToProps)(ClientDetail);
