import React from 'react';
import PropTypes from 'prop-types';

const PanelHeader = props => (
  <div style={{ cursor: 'pointer' }}>
    {props.contextContent.content}
  </div>
);

PanelHeader.propTypes = {
  contextContent: PropTypes.shape({
    lan: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default PanelHeader;
