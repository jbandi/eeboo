import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, PanelGroup, Panel, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import FeedbackerQuestions from '../containers/FeedbackerQuestions';
import PanelHeader from '../containers/PanelHeader';

class Feedbacker extends Component {
  static propTypes = {
    contextIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    feedbackerId: PropTypes.string,
  };

  static defaultProps = {
    feedbackerId: 'default',
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
  )

  render() {
    return (
      <div>
        {this.props.location.pathname}
        <Grid className="home-content">
          <Row>
            <Col xs={6} md={2} />
            <Col xs={6} md={8}>
              <Panel collapsible expanded>
                <table>
                  <tbody>
                    <tr>
                      <td ><div align="left">Rolle:</div></td>
                      <td style={{ paddingLeft: '10px' }}>
                        <div align="left">
                          <DropdownButton title="bitte auswählen" id="bg-nested-dropdown">
                            <MenuItem eventKey="1">Vorgesetzter</MenuItem>
                            <MenuItem eventKey="2">Kunde</MenuItem>
                            <MenuItem eventKey="2">Arbeitskollege</MenuItem>
                          </DropdownButton>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td><div align="left">Feedbacknehmer: &nbsp;</div></td>
                      <td style={{ paddingLeft: '10px' }}><div align="left">Mathias Herzog</div></td>
                    </tr>
                    <tr>
                      <td><div align="left">Laufzeit:</div></td>
                      <td style={{ paddingLeft: '10px' }}><div align="left">31. Oktober 2017</div></td>
                    </tr>
                  </tbody>
                </table>
              </Panel>
            </Col>
            <Col xsHidden md={2} />
          </Row>
          <hr />
          <Row>
            <Col md={2} />
            <Col md={8}>
              <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                { this.props.contextIds.map(contextId => (
                  <Panel
                    key={contextId}
                    collapsible
                    header={this.header(contextId)}
                    eventKey={contextId}
                  >
                    <FeedbackerQuestions contextId={contextId} />
                  </Panel>))
                }
              </PanelGroup>
            </Col>
            <Col md={2} />
          </Row>
          <Col md={10}>
            <div align="right"><Button pullRight>Absenden</Button></div>
          </Col>
          <Col md={2} />
        </Grid>
      </div>
    );
  }
}

export default Feedbacker;
