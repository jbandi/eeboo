import { connect } from 'react-redux';
import ClientContextRadar from '../../../components/Admin/Analysis/ClientContextRadar';
import { getDataByContext } from '../../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  radarData: getDataByContext(
    state,
    ownProps.procId,
    ownProps.client.id,
    1234,
  ),
});

export default connect(mapStateToProps)(ClientContextRadar);
