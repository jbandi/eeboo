import React from 'react';
import PropTypes from 'prop-types';
import FeedbackerQuestions from '../../containers/Feedbacker/FeedbackerQuestions';

const Context = props => (
  <FeedbackerQuestions
    contextId={props.context.id}
    clientId={props.clientId}
    roleId={props.roleId}
    language={props.language}
  />
);

Context.propTypes = {
  context: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  clientId: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default Context;
