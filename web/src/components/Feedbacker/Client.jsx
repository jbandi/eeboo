import React from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, PanelGroup } from 'react-bootstrap';
import Context from './Context';
import PanelHeader from '../../containers/Feedbacker/PanelHeader';

export class Client extends React.Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    contextList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    role: PropTypes.shape({
      content: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
    client: PropTypes.shape({}).isRequired,
    feedbackerId: PropTypes.string.isRequired,
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

  handleClear = (feedbackerId, clientId) => {
    this.props.clearAnswers(feedbackerId, clientId);
  }

  handleSave = () => {
    this.props.saveAnswers();
  }

  handleSelect = (activeKey) => {
    this.setState({ activeKey });
  }

  clientHeader = client => (
    <div style={{ textAlign: 'left' }}>
      <table>
        <tbody>
          <tr>
            <td align="align-left" style={{ paddingRight: '15px' }}>Feedbacknehmer:</td>
            <td>{client.name} {client.firstname}</td>
          </tr>
          <tr>
            <td align="align-left" style={{ paddingRight: '15px' }}>Ihre Rolle:</td>
            <td>
              {this.props.role.content}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  contextHeader = context => (
    <div><PanelHeader
      context={context}
      clientId={this.props.clientId}
      roleId={this.props.role.id}
      language={this.props.language}
    />
    </div>
  );

  render() {
    return (
      <div>
        <Panel header={this.clientHeader(this.props.client)} bsStyle="info">
          <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
            {this.props.contextList.map(context => (
              <Panel
                key={context.id}
                collapsible
                header={this.contextHeader(context)}
                eventKey={context.id}
                bsStyle="warning"
              >
                <Context
                  context={context}
                  client={this.props.client}
                  role={this.props.role}
                  language={this.props.language}
                />
              </Panel>))
            }
          </PanelGroup>
          <div style={{ textAlign: 'right' }}>
            <Button bsStyle="default" onClick={() => this.handleClear(this.props.feedbackerId, this.props.clientId)}>Clear</Button>
            <Button bsStyle="default" onClick={this.handleSave}>Save</Button>
          </div>
        </Panel>
      </div>
    );
  }
}

export default Client;
