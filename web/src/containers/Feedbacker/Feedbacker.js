import { connect } from 'react-redux';
import { getFirstFeedbacker, getFeedbackerClientIds } from '../../state/selectors/feedbacker';
import Feedbacker from '../../components/Feedbacker/Feedbacker';

const mapStateToProps = state => ({
  feedbacker: getFirstFeedbacker(state),
  clientIds: getFeedbackerClientIds(state, getFirstFeedbacker(state).id),
});

export default connect(mapStateToProps)(Feedbacker);
