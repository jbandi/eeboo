import { connect } from 'react-redux';
import Client from '../../../components/Admin/Analysis/Client';
import { getClients, getContextsArray } from '../../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  clients: getClients(state, ownProps.procId),
  contexts: getContextsArray(state, ownProps.procId, 1234),
});

export default connect(mapStateToProps)(Client);
