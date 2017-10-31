import { connect } from 'react-redux';
import FeedbackerAnswer from '../../components/Feedbacker/FeedbackerAnswer';
import { updateAnswer } from '../../state/actions/feedbacker';
import { getFeedbackerAnswers } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  score: getFeedbackerAnswers(state, ownProps.clientId, ownProps.questionId),
}
);

const mapDispatchToProps = dispatch => (
  { updateAnswer: (answer) => { dispatch(updateAnswer(answer)); } }
);

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackerAnswer);
