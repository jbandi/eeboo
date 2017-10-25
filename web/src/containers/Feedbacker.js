import { connect } from 'react-redux';
import { getFeedbacker } from '../state/selectors/feedbacker';
import Feedbacker from '../components/Feedbacker';
import { getUniqueContextIds } from '../state/selectors/questionaire';

const mapStateToProps = (state, ownProps) => ({
  feedbacker: getFeedbacker(state, ownProps.feedbackerId),
  feedbackerId: ownProps.feedbackerId,
  contextIds: getUniqueContextIds(state),
});

export default connect(mapStateToProps)(Feedbacker);
