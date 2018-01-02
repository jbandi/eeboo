import { connect } from 'react-redux';
import ProcessData from '../../components/Admin/ProcessData';
import { getProcess } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  process: getProcess(state, ownProps.procId),
});

export default connect(mapStateToProps)(ProcessData);
