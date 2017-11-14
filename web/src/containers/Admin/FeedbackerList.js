import { connect } from 'react-redux';
import FeedbackerList from '../../components/Admin/FeedbackerList';
import { getFeedbackers } from '../../state/selectors/feedbacker';

const mapStateToProps = state => ({
  feedbackers: getFeedbackers(state),
});

export default connect(mapStateToProps)(FeedbackerList);
