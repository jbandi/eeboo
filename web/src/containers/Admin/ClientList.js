import { connect } from 'react-redux';
import ClientList from '../../components/Admin/ClientList';
import { getClients } from '../../state/selectors/process';
import { uploadClients, deleteClientFromBackend } from '../../state/actions/process';

function upload(dispatch, data, procId) {
  const file = data.target.files[0];
  const reader = new FileReader();
  reader.onload = (() => (
    (e) => {
      dispatch(uploadClients(procId, e.target.result));
    }
  ))(file);
  reader.readAsText(file);
}

const mapStateToProps = (state, ownProps) => ({
  clients: getClients(state, ownProps.procId),
});

const mapDispatchToProps = dispatch => ({
  handleFileUpload: (data, procId) => { upload(dispatch, data, procId); },
  deleteClient: (procId, clientId) => { dispatch(deleteClientFromBackend(procId, clientId)); },
});


export default connect(mapStateToProps, mapDispatchToProps)(ClientList);
