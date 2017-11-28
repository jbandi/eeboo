import { connect } from 'react-redux';
import FeedbackerQuestions from '../../components/Feedbacker/FeedbackerQuestions';
import { getQuestionsByContextId } from '../../state/selectors/questionaire';

const mapStateToProps = (state, ownProps) => ({
  questions: getQuestionsByContextId(
    state.feedbacker.proc.questionaires[1234].questions,
    ownProps.contextId,
    ownProps.roleId,
    state.feedbacker.language,
  ),
});

export default connect(mapStateToProps)(FeedbackerQuestions);
