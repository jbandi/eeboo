import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Grid, Row, Col, FormGroup, FormControl, Table, Button, ControlLabel } from 'react-bootstrap';
import Auth from './../../services/Auth/Auth';

import './datepicker.css';

class ProcessAdd extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    addProc: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      company: '',
      start: moment().valueOf(),
      end: moment().valueOf(),
    };
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  getStartValidation = () => {
    if (!moment(this.state.start).isValid()) return 'error';
    return null;
  };
  getEndValidation = () => {
    if (!moment(this.state.end).isValid()) return 'error';
    return null;
  };

  handleSubmit = (event) => {
    this.props.addProc({
      company: this.state.company,
      start: this.state.start,
      end: this.state.end,
    });
    event.preventDefault();
  }

  handleCompany = (e) => {
    this.setState({ company: e.target.value });
  }

  handleStart = (e) => {
    this.setState({ start: e.valueOf() });
  }
  handleEnd = (e) => {
    this.setState({ end: e.valueOf() });
  }

  render() {
    return (
      <Grid className="process-detail">
        <Row>
          <Col md={2} />
          <Col md={8}>
            <Table>
              <tbody>
                <tr>
                  <td>Company:</td>
                  <td>
                    <FormControl
                      type="text"
                      value={this.state.company}
                      onChange={this.handleCompany}
                      placeholder="Company"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Start Datum:</td>
                  <td>
                    <FormGroup
                      controlId="procAddStart"
                      validationState={this.getStartValidation()}
                    >
                      <ControlLabel>Start Date</ControlLabel>
                      <Datetime
                        id="example-datepicker"
                        closeOnSelect
                        value={this.state.value}
                        onChange={this.handleStart}
                        dateFormat="DD.MM.YYYY"
                        timeFormat={false}
                        defaultValue={moment().valueOf()}
                      />
                    </FormGroup>
                  </td>
                </tr>
                <tr>
                  <td>End Datum:</td>
                  <td>
                    <FormGroup
                      controlId="procAddEnd"
                      validationState={this.getEndValidation()}
                    >
                      <Datetime
                        id="example-datepicker"
                        closeOnSelect
                        value={this.state.value}
                        onChange={this.handleEnd}
                        dateFormat="DD.MM.YYYY"
                        timeFormat={false}
                        defaultValue={moment().valueOf()}
                      />
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
            <p align="right">
              <Button onClick={this.handleSubmit}>Add</Button>
            </p>
          </Col>
          <Col md={2} />
        </Row>
      </Grid>
    );
  }
}


export default ProcessAdd;
