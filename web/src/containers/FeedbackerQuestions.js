import { connect } from 'react-redux';
import FeedbackerQuestions from '../components/FeedbackerQuestions';
import { getQuestionsByContextId } from '../state/selectors/questionaire';
import { getContentByLanguage } from '../state/selectors/context';

const mapStateToProps = (state, ownProps) => ({
  questions: getQuestionsByContextId(state, ownProps.contextId),
  contextContent: getContentByLanguage(state, ownProps.contextId, 'de'),
});

export default connect(mapStateToProps)(FeedbackerQuestions);
