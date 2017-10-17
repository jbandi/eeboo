import { connect } from 'react-redux';
import Feedbacker from '../components/Feedbacker';
import { getUniqueContextIds } from '../state/selectors/questionaire';

const mapStateToProps = state => ({
  company: state.company,
  contextIds: getUniqueContextIds(state),
});

export default connect(mapStateToProps)(Feedbacker);
