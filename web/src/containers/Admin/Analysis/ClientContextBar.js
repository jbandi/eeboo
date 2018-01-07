import { connect } from 'react-redux';
import ClientContextBar from '../../../components/Admin/Analysis/ClientContextBar';
import { getDataByRoleAndContext } from '../../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  barData: getDataByRoleAndContext(
    state,
    ownProps.procId,
    ownProps.client.id,
    ownProps.context,
    1234,
  ),
});

export default connect(mapStateToProps)(ClientContextBar);
