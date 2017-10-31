import { connect } from 'react-redux';
import FeedbackerAnswer from '../../components/Feedbacker/FeedbackerAnswer';
import { updateAnswer } from '../../state/actions/feedbacker';
import { getFeedbackerAnswer } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  score: getFeedbackerAnswer(state, ownProps.clientId, ownProps.questionId),
}
);

const mapDispatchToProps = dispatch => (
  { updateAnswer: (answer) => { dispatch(updateAnswer(answer)); } }
);

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackerAnswer);
