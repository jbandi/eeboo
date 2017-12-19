import { connect } from 'react-redux';
import QuestionRow from '../../components/Admin/QuestionRow';
import { getContentByLanguage } from '../../state/selectors/context';
import { getQuestionContentByLanguage } from '../../state/selectors/questionaire';
import { getLanguage } from '../../state/selectors/process';
import { deleteQuestion } from '../../state/actions/process';

const mapStateToProps = (state, ownProps) => ({
  context: getContentByLanguage(
    ownProps.questionaire.contexts,
    ownProps.question.context,
    getLanguage(ownProps.procId),
  ).content,
  questionContent: getQuestionContentByLanguage(
    ownProps.question,
    'he', // use context='he' as default
    getLanguage(ownProps.procId),
  ),
});

const mapDispatchToProps = dispatch => ({
  deleteQuestion: (data) => {
    dispatch(deleteQuestion(data.procId, data.questionaireId, data.questionId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionRow);
