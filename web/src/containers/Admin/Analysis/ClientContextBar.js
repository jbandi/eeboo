import { connect } from 'react-redux';
import ClientContextBar from '../../../components/Admin/Analysis/ClientContextBar';
import { getDataByRoleAndContext } from '../../../state/selectors/process';
import { getContentByLanguage } from '../../../state/selectors/context';

const mapStateToProps = (state, ownProps) => ({
  barData: getDataByRoleAndContext(
    state,
    ownProps.procId,
    ownProps.client.id,
    ownProps.context,
    1234,
    ownProps.lang,
  ),
  label: getContentByLanguage(ownProps.context, ownProps.lang).content,
});

export default connect(mapStateToProps)(ClientContextBar);
