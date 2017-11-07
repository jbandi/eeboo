import { connect } from 'react-redux';
import ProcessListRow from '../../components/Admin/ProcessListRow';
import { getProcess } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  process: getProcess(state, ownProps.id),
});

export default connect(mapStateToProps)(ProcessListRow);
