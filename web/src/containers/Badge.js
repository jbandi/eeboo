import { connect } from 'react-redux';
import Badge from '../components/Badge';
import { getQuestionsByContextId, countAnswersByContextId } from '../state/selectors/questionaire';
import { getFeedbackerAnswers } from '../state/selectors/feedbacker';

const mapStateToProps = (state, ownProps) => ({
  total: getQuestionsByContextId(state, ownProps.contextId).length,
  done: countAnswersByContextId(state, getFeedbackerAnswers(state, 1), ownProps.contextId),
});

export default connect(mapStateToProps)(Badge);
