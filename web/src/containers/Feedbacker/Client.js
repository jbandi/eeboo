import { connect } from 'react-redux';
import { getContexts, getRoleIdByClientId } from '../../state/selectors/feedbacker';
import { getRolesByLanguage, getRoleById } from '../../state/selectors/questionaire';
import { Client } from '../../components/Feedbacker/Client';
import { updateRole, postFeedbacker, clearAnswers } from '../../state/actions/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  contextList: getContexts(state, 1234),
  roles: getRolesByLanguage(
    state.feedbacker.proc.questionaires[1234],
    state.feedbacker.language,
  ),
  role: getRoleById(
    state.feedbacker.proc.questionaires[1234],
    getRoleIdByClientId(state.feedbacker, ownProps.clientId),
    'de',
  ),
});

const mapDispatchToProps = dispatch => ({
  updateRole: (data) => { dispatch(updateRole(data)); },
  clearAnswers: (clientId) => { dispatch(clearAnswers(clientId)); },
  saveAnswers: () => { dispatch(postFeedbacker()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Client);
