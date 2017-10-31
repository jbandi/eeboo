import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelGroup } from 'react-bootstrap';
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

  header = contextId => (
    <div><PanelHeader contextId={contextId} /></div>
  );

  render() {
    return (
      <div>
        <Panel collapsible expanded header={this.props.clientId} bsStyle="info">
          <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
            {this.props.contextList.map(context => (
              <Panel
                key={context.id}
                collapsible
                header={this.header(context.id)}
                eventKey={context.id}
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
