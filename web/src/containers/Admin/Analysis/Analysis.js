import { connect } from 'react-redux';
import Analysis from '../../../components/Admin/Analysis/Analysis';
import { getClients } from '../../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  clients: getClients(state, ownProps.procId),
});

export default connect(mapStateToProps)(Analysis);
