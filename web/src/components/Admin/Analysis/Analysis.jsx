import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, DropdownButton, MenuItem } from 'react-bootstrap';

import Client from '../../../containers/Admin/Analysis/Client';

class Analysis extends React.Component {
  static propTypes = {
    clients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    procId: PropTypes.string.isRequired,
  }

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
      <div>
        <Row>
          <Col>
            <div align="left">
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
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {(this.state.client.id !== undefined)
              ? <Client client={this.state.client} procId={this.props.procId} />
              : <div>Bitte einen Feedbacknehmer auswählen</div>
            }
          </Col>
        </Row>
      </div>
    );
  }
}


export default Analysis;
