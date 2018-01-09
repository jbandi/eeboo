import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Table, Panel, ButtonToolbar } from 'react-bootstrap';

import { PDF } from '../../../utils/pdf';
import ClientContextBar from '../../../containers/Admin/Analysis/ClientContextBar';
import ClientContextRadar from '../../../containers/Admin/Analysis/ClientContextRadar';

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {
        bar: true,
        radar: true,
      },
    };
    this.bars = {};
    this.radar = {};
  }

  toggleButton = (dia) => {
    const selected = Object.assign({}, this.state.selected, {
      ...this.state.selected,
      [dia]: !this.state.selected[dia],
    });
    this.setState(() => ({ selected }));
  }

  // generate a pdf, including all selected Chart types
  generatePDF = () => {
    const { bars, radar } = this;
    const { client } = this.props;
    const pdf = new PDF(`${client.firstname} ${client.name}`, true, '', true);
    if (this.state.selected.bar) {
      const barsArray = Object.keys(bars).map(key => (bars[key]));
      barsArray.forEach(chart =>
        pdf.addBarChart(chart.bar.getChart(), chart.props.context.contents[0].content));
    }
    if (this.state.selected.radar) {
      pdf.addRadarChart(radar.radar.getChart());
    }
    pdf.save(`${client.firstname}-${client.name}.pdf`);
  }

  header = client => (
    <div align="left">
      <div style={{ display: 'inline-block' }}>{client.firstname} {client.name}</div>
      <div style={{ float: 'right' }}>
        <ButtonToolbar>
          <ButtonGroup bsSize="small">
            <Button
              onClick={() => this.toggleButton('bar')}
              bsStyle={(this.state.selected.bar) ? 'success' : 'default'}
            >Bar
            </Button>
          </ButtonGroup>
          <ButtonGroup bsSize="small">
            <Button
              onClick={() => this.toggleButton('radar')}
              bsStyle={(this.state.selected.radar) ? 'success' : 'default'}
            >Radar
            </Button>
          </ButtonGroup>
          <ButtonGroup bsSize="small">
            <Button
              onClick={() => this.generatePDF()}
              bsSize="small"
              bsStyle="link"
            >
              Save as PDF
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  )

  render() {
    return (
      <Panel header={this.header(this.props.client)}>
        {(this.state.selected.bar) && (
          <Table>
            <tbody>
              {this.props.contexts.map(context => (
                <ClientContextBar
                  key={context.id}
                  context={context}
                  client={this.props.client}
                  procId={this.props.procId}
                  onRef={(ref) => { this.bars[context.id] = ref; }}
                />
              ))}
            </tbody>
          </Table>
        )}
        {(this.state.selected.radar) && (
          <Table>
            <tbody>
              <ClientContextRadar
                key={this.props.client.id}
                client={this.props.client}
                procId={this.props.procId}
                onRef={(ref) => { this.radar = ref; }}
              />
            </tbody>
          </Table>
        )}
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
