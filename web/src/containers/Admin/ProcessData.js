import { connect } from 'react-redux';
import ProcessData from '../../components/Admin/ProcessData';
import { getProcess } from '../../state/selectors/process';
import { updateProcess, putProc } from '../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  process: getProcess(state, ownProps.procId),
});

const mapDispatchToProps = dispatch => ({
  saveProcessData: (p) => {
    dispatch(updateProcess(p));
    dispatch(putProc(p.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProcessData);
