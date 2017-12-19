import { connect } from 'react-redux';
import { getFirstFeedbacker, getFeedbackerClientIds } from '../../state/selectors/feedbacker';
import Feedbacker from '../../components/Feedbacker/Feedbacker';
import { setLanguage } from '../../state/actions/process';
import { fetchFeedbacker } from '../../state/actions/feedbacker';

const mapStateToProps = state => ({
  feedbacker: getFirstFeedbacker(state),
  clientIds: getFeedbackerClientIds(state, getFirstFeedbacker(state).id),
});

const mapDispatchToProps = dispatch => ({
  setLanguage: (procId, language) => { dispatch(setLanguage(procId, language)); },
  fetchFeedbacker: (id) => { dispatch(fetchFeedbacker(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedbacker);
