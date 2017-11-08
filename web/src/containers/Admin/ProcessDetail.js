import { connect } from 'react-redux';
import ProcessDetail from '../../components/Admin/ProcessDetail';
import { getProcess } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  process: getProcess(state, ownProps.match.params.id),
});

export default connect(mapStateToProps)(ProcessDetail);
