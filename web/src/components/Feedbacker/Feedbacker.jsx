import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Panel } from 'react-bootstrap';
import Client from '../../containers/Feedbacker/Client';
import PanelHeader from '../../containers/Feedbacker/PanelHeader';
import { fetchFeedbacker } from '../../state/actions/feedbacker';

class Feedbacker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    feedbacker: PropTypes.shape({
      id: PropTypes.string,
      mail: PropTypes.string,
      clients: PropTypes.shape({}),
      proc: PropTypes.string,
    }).isRequired,
    clientIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    feedbackerId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(fetchFeedbacker(this.props.feedbackerId));
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
                    <Client clientId={id} language="de" />
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
