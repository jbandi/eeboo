import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../../containers/Feedbacker/Badge';

const PanelHeader = props => (
  <div style={{ cursor: 'pointer' }}>
    {props.contextContent.content} .. &nbsp;
    <Badge
      clientId={props.clientId}
      contextId={props.contextId}
      language={props.language}
      roleId={props.roleId}
    />
  </div>
);

PanelHeader.propTypes = {
  contextContent: PropTypes.shape({
    lan: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  contextId: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
};

export default PanelHeader;
