import React from 'react';
import PropTypes from 'prop-types';

import { DropdownButton, MenuItem } from 'react-bootstrap';

import Client from '../../../containers/Admin/Analysis/Client';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
    };
  }

  selectClient(client) {
    this.setState(() => ({ client }));
  }

  render() {
    return (
      <div align="left" ref={(ref) => { this.chart = ref; }}>
        <DropdownButton
          bsStyle="primary"
          title="Feedbacknehmer"
          id="clientSelect"
        >
          {this.props.clients.map(client => (
            <MenuItem
              key={client.id}
              eventKey={client.id}
              onSelect={() => this.selectClient(client)}
            >
              {client.firstname} {client.name}
            </MenuItem>
          ))}
        </DropdownButton>
        <hr />
        {(this.state.client.id !== undefined)
          ? <Client client={this.state.client} procId={this.props.procId} />
          : <div>Bitte einen Feedbacknehmer auswählen</div>
        }
      </div>
    );
  }
}

Analysis.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  procId: PropTypes.string.isRequired,
};

export default Analysis;
