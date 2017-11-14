import { connect } from 'react-redux';
import ProcessListRow from '../../components/Admin/ProcessListRow';
import { getProcess } from '../../state/selectors/process';
import { deleteProc } from '../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  process: getProcess(state, ownProps.id),
});

const mapDispatchToProps = dispatch => (
  { deleteProc: (id) => { dispatch(deleteProc(id)); } }
);

export default connect(mapStateToProps, mapDispatchToProps)(ProcessListRow);
