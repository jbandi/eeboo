import { connect } from 'react-redux';
import ClientList from '../../components/Admin/ClientList';
import { getClients } from '../../state/selectors/process';
import { deleteClientAndFeedbackers, importClients, putProc } from '../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  clients: getClients(state, ownProps.procId),
});

const mapDispatchToProps = dispatch => ({
  handleFileUpload: (data, procId) => { dispatch(importClients(data, procId)); },
  deleteClient: (procId, clientId) => { dispatch(deleteClientAndFeedbackers(procId, clientId)); },
  saveProcess: (procId) => { dispatch(putProc(procId)); },
});


export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
