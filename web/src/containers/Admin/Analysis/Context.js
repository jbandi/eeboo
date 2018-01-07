import { connect } from 'react-redux';
import Context from '../../../components/Admin/Analysis/Context';
import { getDataByContext } from '../../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  barData: getDataByContext(
    state,
    ownProps.procId,
    ownProps.client.id,
    ownProps.context,
    1234,
  ),
});

export default connect(mapStateToProps)(Context);
