import { connect } from 'react-redux';
import { getContexts, getRoleIdByClientId } from '../../state/selectors/feedbacker';
import { getRolesByLanguage, getRoleById } from '../../state/selectors/questionaire';
import { Client } from '../../components/Feedbacker/Client';
import { updateRole } from '../../state/actions/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  contextList: getContexts(state, 1234),
  roles: getRolesByLanguage(state.feedbacker.proc.questionaires[1234], 'de'),
  role: getRoleById(
    state.feedbacker.proc.questionaires[1234],
    getRoleIdByClientId(state, ownProps.clientId),
    'de'),
});

const mapDispatchToProps = dispatch => (
  { updateRole: (data) => { dispatch(updateRole(data)); } }
);

export default connect(mapStateToProps, mapDispatchToProps)(Client);
