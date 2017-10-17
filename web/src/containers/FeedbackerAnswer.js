import { connect } from 'react-redux';
import FeedbackerAnswer from '../components/FeedbackerAnswer';
import { updateAnswer } from '../state/actions/feedbacker';
import { getFeedbackerAnswer } from '../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  score: getFeedbackerAnswer(state, 1, ownProps.questionId),
}
);

const mapDispatchToProps = dispatch => (
  { updateAnswer: (answer) => { dispatch(updateAnswer(answer)); } }
);

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackerAnswer);
