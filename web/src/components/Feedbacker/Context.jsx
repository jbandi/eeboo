import React from 'react';
import PropTypes from 'prop-types';
import FeedbackerQuestions from '../../containers/Feedbacker/FeedbackerQuestions';

const Context = props => (
  <FeedbackerQuestions contextId={props.context.id} clientId={props.clientId} />
);

Context.propTypes = {
  context: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  clientId: PropTypes.string.isRequired,
};

export default Context;
