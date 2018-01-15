import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Panel, Button } from 'react-bootstrap';
import Client from '../../containers/Feedbacker/Client';
import PanelHeader from '../../containers/Feedbacker/PanelHeader';

import { Language } from '../../utils';

class Feedbacker extends Component {
  static propTypes = {
    feedbacker: PropTypes.shape({
      id: PropTypes.string,
      mail: PropTypes.string,
      clients: PropTypes.shape({}),
      proc: PropTypes.string,
    }).isRequired,
    clientIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    feedbackerId: PropTypes.string.isRequired,
    setLanguage: PropTypes.func.isRequired,
    fetchFeedbacker: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchFeedbacker(this.props.feedbackerId);
  }

  setLanguage = (lan) => {
    this.props.setLanguage(this.props.feedbacker.proc, lan);
  }

  header = contextId => (
    <div><PanelHeader contextId={contextId} /></div>
  )

  render() {
    return (
      (this.props.feedbacker.id !== '')
        ? <div>
          <Grid className="home-content">
            <Row>
              <Col md={2} />
              <Col md={8}>
                <div align="right">
                  <Button bsStyle="link" onClick={() => this.setLanguage(Language.DE)}>
                    Deutsch
                  </Button>|
                  <Button bsStyle="link" onClick={() => this.setLanguage(Language.EN)}>
                    English
                  </Button>
                </div>
                <Panel collapsible expanded>
                  <table>
                    <tbody>
                      <tr>
                        <td><div align="left">Feedbackgeber: &nbsp;</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.id}</div></td>
                      </tr>
                      <tr>
                        <td><div align="left">Mail:</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.mail}</div></td>
                      </tr>
                      <tr>
                        <td><div align="left">Prozess</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.proc}</div></td>
                      </tr>
                    </tbody>
                  </table>
                </Panel>
              </Col>
              <Col md={2} />
            </Row>
            <hr />
            <Row>
              <Col md={2} />
              <Col md={8}>
                { this.props.clientIds.map(id => (
                  <div key={id}>
                    <Client clientId={id} />
                    <hr />
                  </div>))}
              </Col>
              <Col md={2} />
            </Row>
          </Grid>
        </div> // eslint-disable-line
        : <div>
          <div>... loading data</div> <br />
          <div>data should load within seconds. if not, please talk to the administrator</div>
        </div> // eslint-disable-line
    );
  }
}

export default Feedbacker;
