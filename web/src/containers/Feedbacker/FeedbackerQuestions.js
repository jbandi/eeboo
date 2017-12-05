import { connect } from 'react-redux';
import FeedbackerQuestions from '../../components/Feedbacker/FeedbackerQuestions';
import { getQuestionsByContextId } from '../../state/selectors/questionaire';
import { getQuestionaire } from '../../state/selectors/process';
import { getFirstFeedbacker } from '../../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  questions: getQuestionsByContextId(
    getQuestionaire(state, getFirstFeedbacker(state).proc, 1234).questions,
    ownProps.contextId,
    ownProps.roleId,
    'de',
  ),
});

export default connect(mapStateToProps)(FeedbackerQuestions);
