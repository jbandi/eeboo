import { connect } from 'react-redux';
import { RoleRow } from '../../components/Admin/RoleRow';
import { getRoleById } from '../../state/selectors/questionaire';
import { getLanguage } from '../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  role: getRoleById(
    ownProps.questionaire,
    ownProps.role.id,
    getLanguage(ownProps.procId),
  ),
});

export default connect(mapStateToProps)(RoleRow);
