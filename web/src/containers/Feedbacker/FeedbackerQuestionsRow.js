import { connect } from 'react-redux';
import { FeedbackerQuestionsRow } from '../../components/Feedbacker/FeedbackerQuestionsRow';
import { getQuestionContentByLanguage } from '../../state/selectors/questionaire';
import { getLanguage } from '../../state/selectors/process';
import { getGenderContext } from '../../utils';

const mapStateToProps = (state, ownProps) => ({
  content: getQuestionContentByLanguage(
    ownProps.question,
    getGenderContext(ownProps.client, ownProps.role),
    getLanguage(ownProps.procId),
  ),
});

export default connect(mapStateToProps)(FeedbackerQuestionsRow);
