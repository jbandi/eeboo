import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Context from './Context';
import PanelHeader from '../../containers/Feedbacker/PanelHeader';

export class Client extends React.Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    contextList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }

  constructor() {
    super();
    this.state = {
      activeKey: 1,
    };
  }

  handleSelect = (activeKey) => {
    this.setState({ activeKey });
  }

  clientHeader = clientId => (
    <div style={{ textAlign: 'left' }}>
      <table>
        <tbody>
          <tr>
            <td align="align-left" style={{ paddingRight: '15px' }}>Feedbacknehmer:</td>
            <td>{clientId}</td>
          </tr>
          <tr>
            <td align="align-left" style={{ paddingRight: '15px' }}>Ihre Rolle:</td>
            <td>
              <DropdownButton title="Teamleiter" id="bg-nested-dropdown" bsSize="small" pullRight>
                <MenuItem eventKey="1">Teamleiter</MenuItem>
                <MenuItem eventKey="2">Arbeitskollege</MenuItem>
              </DropdownButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  contextHeader = contextId => (
    <div><PanelHeader contextId={contextId} clientId={this.props.clientId} /></div>
  );

  render() {
    return (
      <div>
        <Panel header={this.clientHeader(this.props.clientId)} bsStyle="info">
          <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
            {this.props.contextList.map(context => (
              <Panel
                key={context.id}
                collapsible
                header={this.contextHeader(context.id)}
                eventKey={context.id}
                bsStyle="warning"
              >
                <Context context={context} clientId={this.props.clientId} />
              </Panel>))
            }
          </PanelGroup>
        </Panel>
      </div>
    );
  }
}

export default Client;
