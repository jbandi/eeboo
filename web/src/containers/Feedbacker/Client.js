import { connect } from 'react-redux';
import { getContexts, getRoleIdByClientId } from '../../state/selectors/feedbacker';
import { getRolesByLanguage, getRoleById } from '../../state/selectors/questionaire';
import { Client } from '../../components/Feedbacker/Client';

const mapStateToProps = (state, ownProps) => ({
  contextList: getContexts(state, 1234),
  roles: getRolesByLanguage(state.feedbacker.proc.questionaires[1234], 'de'),
  role: getRoleById(
    state.feedbacker.proc.questionaires[1234],
    getRoleIdByClientId(state, ownProps.clientId),
    'de'),
});

export default connect(mapStateToProps)(Client);
