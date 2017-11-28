import { connect } from 'react-redux';
import ClientList from '../../components/Admin/ClientList';
import { getClients } from '../../state/selectors/process';
import { deleteClientFromBackend, importClients } from '../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  clients: getClients(state, ownProps.procId),
});

const mapDispatchToProps = dispatch => ({
  handleFileUpload: (data, procId) => { dispatch(importClients(data, procId)); },
  deleteClient: (procId, clientId) => { dispatch(deleteClientFromBackend(procId, clientId)); },
});


export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
