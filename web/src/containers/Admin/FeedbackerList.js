import { connect } from 'react-redux';
import FeedbackerList from '../../components/Admin/FeedbackerList';
import { getFeedbackerArray } from '../../state/selectors/feedbacker';
import { deleteFeedbackerFromBackend } from '../../state/actions/feedbacker';

const mapStateToProps = state => ({
  feedbackers: getFeedbackerArray(state),
});

const mapDispatchToProps = dispatch => (
  {
    deleteFeedbacker: (id) => {
      dispatch(deleteFeedbackerFromBackend(id));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackerList);
