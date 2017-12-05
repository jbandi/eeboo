import { connect } from 'react-redux';
import FeedbackerAnswer from '../../components/Feedbacker/FeedbackerAnswer';
import { updateAnswer } from '../../state/actions/feedbacker';
import { getFirstFeedbackerId, getFeedbackerAnswer } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  score: getFeedbackerAnswer(
    state,
    getFirstFeedbackerId(state),
    ownProps.clientId,
    ownProps.questionId,
  ),
  feedbackerId: getFirstFeedbackerId(state),
}
);

const mapDispatchToProps = dispatch => (
  { updateAnswer: (answer) => { dispatch(updateAnswer(answer)); } }
);

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackerAnswer);
