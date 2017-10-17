import { connect } from 'react-redux';
import FeedbackerQuestions from '../components/FeedbackerQuestions';
import { getQuestionsByContextId } from '../state/selectors/questionaire';

const mapStateToProps = (state, ownProps) => ({
  questions: getQuestionsByContextId(state, ownProps.contextId),
});

export default connect(mapStateToProps)(FeedbackerQuestions);
