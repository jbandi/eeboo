import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../../containers/Badge';

const PanelHeader = props => (
  <div style={{ cursor: 'pointer' }}>
    {props.contextContent.content} .. &nbsp;
  </div>
);

PanelHeader.propTypes = {
  contextContent: PropTypes.shape({
    lan: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  contextId: PropTypes.number.isRequired,
};

export default PanelHeader;
