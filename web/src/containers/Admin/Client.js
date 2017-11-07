import { connect } from 'react-redux';
import Client from '../../components/Admin/Client';
import { getClients } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  clients: getClients(state, ownProps.procId),
});

export default connect(mapStateToProps)(Client);
