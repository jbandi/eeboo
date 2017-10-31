import { connect } from 'react-redux';
import { getContexts } from '../../state/selectors/feedbacker';
import Client from '../../components/Feedbacker/Client';

const mapStateToProps = state => ({
  contextList: getContexts(state, 1234),
});

export default connect(mapStateToProps)(Client);
