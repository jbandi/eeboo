import { connect } from 'react-redux';
import { getFeedbacker, getFeedbackerClientIds } from '../../state/selectors/feedbacker';
import Feedbacker from '../../components/Feedbacker/Feedbacker';

const mapStateToProps = state => ({
  feedbacker: getFeedbacker(state),
  clientIds: getFeedbackerClientIds(state),
});

export default connect(mapStateToProps)(Feedbacker);
