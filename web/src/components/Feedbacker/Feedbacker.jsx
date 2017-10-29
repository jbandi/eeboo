import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Panel } from 'react-bootstrap';
import Client from './Client';
import PanelHeader from '../../containers/Feedbacker/PanelHeader';
import { fetchFeedbacker } from '../../state/actions/feedbacker';

class Feedbacker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    feedbacker: PropTypes.shape({
      id: PropTypes.string,
      mail: PropTypes.string,
      proc: PropTypes.shape({
        id: PropTypes.string,
      }),
      clients: PropTypes.shape({}),
    }).isRequired,
    clientIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeKey: 1,
    };
  }

  componentWillMount() {
    const pathArray = this.props.location.pathname.split('/');
    const id = pathArray[pathArray.length - 1];
    this.props.dispatch(fetchFeedbacker(id));
  }

  handleSelect = (activeKey) => {
    this.setState({ activeKey });
  }

  header = contextId => (
    <div><PanelHeader contextId={contextId} /></div>
  )

  render() {
    return (
      (this.props.feedbacker.proc && this.props.feedbacker.id !== 'default')
        ? <div>
          <Grid className="home-content">
            <Row>
              <Col xs={6} md={2} />
              <Col xs={6} md={8}>
                <Panel collapsible expanded>
                  <table>
                    <tbody>
                      <tr>
                        <td><div align="left">Feedbacknehmer: &nbsp;</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.id}</div></td>
                      </tr>
                      <tr>
                        <td><div align="left">Mail:</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.mail}</div></td>
                      </tr>
                      <tr>
                        <td><div align="left">Prozess</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.proc.id}</div></td>
                      </tr>
                    </tbody>
                  </table>
                </Panel>
              </Col>
              <Col xs={6} md={2} />
            </Row>
            <hr />
            <Row>
              <Col md={2} />
              <Col md={8}>
                {this.props.clientIds.map(id => (
                  <Client clientId={id} />
                ))}
              </Col>
              <Col md={2} />
            </Row>
          </Grid>
        </div>
        : <div>
          id not found
        </div>
    );
  }
}

export default Feedbacker;
