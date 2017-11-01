import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, PanelGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import Context from './Context';
import PanelHeader from '../../containers/Feedbacker/PanelHeader';

export class Client extends React.Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    contextList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    roles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      contents: PropTypes.PropTypes.shape({}),
    })).isRequired,
    role: PropTypes.shape({
      content: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
    updateRole: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    clearAnswers: PropTypes.func.isRequired,
    saveAnswers: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      activeKey: 0,
    };
  }

  handleClear = (clientId) => {
    this.props.clearAnswers(clientId);
  }

  handleSave = () => {
    this.props.saveAnswers();
  }

  handleRoleSelect = (roleId) => {
    this.props.updateRole({
      clientId: this.props.clientId,
      roleId,
    });
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
              <DropdownButton title={this.props.role.content} id="bg-nested-dropdown" bsSize="small" pullRight>
                {this.props.roles.map(role => (
                  <MenuItem
                    key={role.id}
                    onSelect={() => this.handleRoleSelect(role.id)}
                  >{role.contents.content}</MenuItem>
                ))}
              </DropdownButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  contextHeader = contextId => (
    <div><PanelHeader
      contextId={contextId}
      clientId={this.props.clientId}
      roleId={this.props.role.id}
      language={this.props.language}
    /></div>
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
                <Context
                  context={context}
                  clientId={this.props.clientId}
                  roleId={this.props.role.id}
                  language={this.props.language}
                />
              </Panel>))
            }
          </PanelGroup>
          <div style={{ textAlign: 'right' }}>
            <Button bsStyle="default" onClick={() => this.handleClear(this.props.clientId)}>Clear</Button>
            <Button bsStyle="default" onClick={this.handleSave}>Save</Button>
          </div>
        </Panel>
      </div>
    );
  }
}

export default Client;
