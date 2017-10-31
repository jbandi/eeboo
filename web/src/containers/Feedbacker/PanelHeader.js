import { connect } from 'react-redux';
import PanelHeader from '../../components/Feedbacker/PanelHeader';
import { getContentByLanguage } from '../../state/selectors/context';

const mapStateToProps = (state, ownProps) => ({
  contextContent: getContentByLanguage(
    state.feedbacker.proc.questionaires[1234].contexts, ownProps.contextId, 'de'),
});

export default connect(mapStateToProps)(PanelHeader);
