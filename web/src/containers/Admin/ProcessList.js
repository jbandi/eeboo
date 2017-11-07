import { connect } from 'react-redux';
import ProcessList from '../../components/Admin/ProcessList';
import { getProcs } from '../../state/selectors/process';

const mapStateToProps = state => ({
  procs: getProcs(state),
});

export default connect(mapStateToProps)(ProcessList);
