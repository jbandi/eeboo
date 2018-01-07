import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Panel } from 'react-bootstrap';

import Context from '../../../containers/Admin/Analysis/Context';

class Client extends React.Component {
  header = client => (
    <div align="left">
      <div style={{ display: 'inline-block' }}>{client.firstname} {client.name}</div>
      <div style={{ float: 'right' }}>
        <Button
          onClick={() => this.generatePDF()}
          bsSize="small"
        >
          Save as PDF
        </Button>
      </div>
    </div>
  )

  render() {
    return (
      <Panel header={this.header(this.props.client)}>
        <Table border="1">
          <tbody>
            {this.props.contexts.map(context => (
              <Context
                key={context.id}
                context={context}
                client={this.props.client}
                procId={this.props.procId}
              />
            ))}
          </tbody>
        </Table>
      </Panel>
    );
  }
}

Client.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  contexts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  procId: PropTypes.string.isRequired,
};

export default Client;
