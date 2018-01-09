import { connect } from 'react-redux';
import ProcessDetail from '../../components/Admin/ProcessDetail';
import { getProcess } from '../../state/selectors/process';
import { fetchProcs } from '../../state/actions/process';
import { fetchFeedbackersByProcId } from './../../state/actions/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  process: getProcess(state, ownProps.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  fetchProcs: () => { dispatch(fetchProcs()); },
  fetchFeedbackersByProcId: (id) => { dispatch(fetchFeedbackersByProcId(id)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProcessDetail);
