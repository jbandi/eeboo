import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, Panel, DropdownButton, MenuItem } from 'react-bootstrap';
import PanelHeader from '../containers/PanelHeader';
import { fetchFeedbacker } from '../state/actions/feedbacker';

class Feedbacker extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    feedbacker: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      mail: PropTypes.string,
      role: PropTypes.number,
      answers: PropTypes.shape({}),
      questionaire: PropTypes.string,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    feedbackerId: '',
  }

  constructor() {
    super();
    this.state = {
      activeKey: 1,
    };
  }

  componentWillMount() {
    const pathArray = this.props.location.pathname;
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
      (this.props.feedbacker && this.props.feedbacker.id !== 'default')
        ? <div>
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
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.name}</div></td>
                      </tr>
                      <tr>
                        <td><div align="left">Mail:</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.mail}</div></td>
                      </tr>
                      <tr>
                        <td><div align="left">Fragebogen</div></td>
                        <td style={{ paddingLeft: '10px' }}><div align="left">{this.props.feedbacker.questionaire}</div></td>
                      </tr>
                    </tbody>
                  </table>
                </Panel>
              </Col>
              <Col xsHidden md={2} />
            </Row>
            <hr />
            <Col md={2} />
          </Grid>
        </div>
        : <div>
          id not found
        </div>
    );
  }
}

export default Feedbacker;
