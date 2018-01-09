import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Panel, Tabs, Tab } from 'react-bootstrap';

import { PDF } from '../../../utils/pdf';
import ClientContextBar from '../../../containers/Admin/Analysis/ClientContextBar';
import ClientContextRadar from '../../../containers/Admin/Analysis/ClientContextRadar';

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1,
    };
    this.bars = {};
  }

  handleSelect = (key) => {
    this.setState({ key });
  }

  generatePDF = () => {
    const { bars } = this;
    const { client } = this.props;
    const pdf = new PDF(`${client.firstname} ${client.name}`, true, '', true);
    // TODO: respect language
    const barsArray = Object.keys(this.bars).map(key => (bars[key]));
    barsArray.forEach(chart =>
      pdf.addBarChart(chart.bar.getChart(), chart.props.context.contents[0].content));
    pdf.save(`${client.firstname}-${client.name}.pdf`);
  }

  header = client => (
    <div align="left">
      <div style={{ display: 'inline-block' }}>{client.firstname} {client.name}</div>
      {(this.state.key === 1) && (
        <div style={{ float: 'right' }}>
          <Button
            onClick={() => this.generatePDF()}
            bsSize="small"
          >
            Save as PDF
          </Button>
        </div>
      )}
    </div>
  )

  render() {
    return (
      <Panel header={this.header(this.props.client)}>
        <Tabs animation={false} defaultActiveKey={1} onSelect={this.handleSelect} id="questionaire-tabs">
          <Tab eventKey={1} title="Balkendiagramm">
            <Table>
              <tbody>
                {this.props.contexts.map(context => (
                  <ClientContextBar
                    key={context.id}
                    tab={this.state.key}
                    context={context}
                    client={this.props.client}
                    procId={this.props.procId}
                    onRef={(ref) => { this.bars[context.id] = ref; }}
                  />
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey={2} title="Radar">
            <Table>
              <tbody>
                <ClientContextRadar
                  key={this.props.client.id}
                  client={this.props.client}
                  procId={this.props.procId}
                />
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Panel>
    );
  }
}

Client.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  contexts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  procId: PropTypes.string.isRequired,
};

export default Client;
