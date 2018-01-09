import { connect } from 'react-redux';
import PanelHeader from '../../components/Feedbacker/PanelHeader';
import { getContentByLanguage } from '../../state/selectors/context';
import { getLanguage } from '../../state/selectors/process';
import { getFirstFeedbackerProc } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  contextContent: getContentByLanguage(
    ownProps.context,
    getLanguage(state, getFirstFeedbackerProc(state)),
  ),
});

export default connect(mapStateToProps)(PanelHeader);
