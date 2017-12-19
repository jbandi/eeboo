import { connect } from 'react-redux';
import PanelHeader from '../../components/Feedbacker/PanelHeader';
import { getContentByLanguage } from '../../state/selectors/context';
import { getContexts, getLanguage } from '../../state/selectors/process';
import { getFirstFeedbackerProc } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  contextContent: getContentByLanguage(
    getContexts(state, getFirstFeedbackerProc(state), 1234),
    ownProps.contextId,
    getLanguage(getFirstFeedbackerProc(state)),
  ),
});

export default connect(mapStateToProps)(PanelHeader);
