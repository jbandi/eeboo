import { connect } from 'react-redux';
import ProcessAdd from '../../components/Admin/ProcessAdd';
import { addProc } from '../../state/actions/process';

const mapDispatchToProps = dispatch => (
  { addProc: (process) => { dispatch(addProc(process)); } }
);

export default connect(null, mapDispatchToProps)(ProcessAdd);
