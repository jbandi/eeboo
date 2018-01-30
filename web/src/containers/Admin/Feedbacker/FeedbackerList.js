import { connect } from 'react-redux';
import FeedbackerList from '../../../components/Admin/Feedbacker/FeedbackerList';
import { getFeedbackerArray } from '../../../state/selectors/feedbacker';
import { getNumQuestions } from '../../../state/selectors/process';

const mapStateToProps = (state, ownProps) => ({
  feedbackers: getFeedbackerArray(state),
  numQuestions: getNumQuestions(state, ownProps.procId, 1234),
});

export default connect(mapStateToProps)(FeedbackerList);
