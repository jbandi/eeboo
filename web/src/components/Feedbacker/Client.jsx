import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';

const Client = props => (
  <div>
    <Panel collapsible expanded>
      <div>{props.clientId}</div>
    </Panel>
  </div>
);

Client.propTypes = {
  clientId: PropTypes.number.isRequired,
};

export default Client;
