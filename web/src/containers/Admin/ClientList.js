import { connect } from 'react-redux';
import ClientList from '../../components/Admin/ClientList';
import { getClients } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  clients: getClients(state, ownProps.procId),
});

export default connect(mapStateToProps)(ClientList);
