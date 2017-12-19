import React from 'react';
import PropTypes from 'prop-types';
import FeedbackerQuestions from '../../containers/Feedbacker/FeedbackerQuestions';

const Context = props => (
  <FeedbackerQuestions
    contextId={props.context.id}
    client={props.client}
    role={props.role}
    language={props.language}
  />
);

Context.propTypes = {
  context: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  client: PropTypes.shape({}).isRequired,
  role: PropTypes.shape({}).isRequired,
  language: PropTypes.string.isRequired,
};

export default Context;
