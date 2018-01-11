import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Datetime from 'react-datetime';
import moment from 'moment';

import './Admin.css';

class ProcessDataEdit extends React.Component {
  static propTypes = {
    process: PropTypes.shape({
      id: PropTypes.string,
      company: PropTypes.string,
      start: PropTypes.number,
      end: PropTypes.number,
    }).isRequired,
    saveProcessData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const {
      id,
      company,
      start,
      end,
    } = this.props.process;
    this.state = {
      company,
      id,
      start,
      end,
    };
  }

  getValidationState = (key) => {
    let err = true;
    switch (key) {
      case 'company':
        err = !this.validCompany();
        break;
      case 'end':
        err = !this.validDate(key);
        break;
      case 'start':
        err = !this.validDate(key);
        break;
      default:
        err = true;
    }
    return (err) ? 'error' : 'success';
  }

  validCompany = () => (
    (this.state.company).length > 0
  )

  validDate = key => (
    moment(this.state[key]).isValid()
  )

  validForm = () => (
    (this.validCompany() && this.validDate('start') && this.validDate('end'))
  )

  handleChange = (key, val) => {
    this.setState(() => ({ [key]: val }));
  }

  handleSubmit = (event) => {
    this.props.saveProcessData({
      id: this.state.id,
      company: this.state.company,
      start: this.state.start,
      end: this.state.end,
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
            <h2 align="center">Stammdaten ändern</h2>
            <hr />
          </Col>
        </Row>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="formHorizontalId">
            <Col componentClass={ControlLabel} sm={2}>
              Id
            </Col>
            <Col sm={4}>
              <FormControl
                disabled
                type="text"
                value={this.state.id}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalCompany" validationState={this.getValidationState('company')}>
            <Col componentClass={ControlLabel} sm={2}>
              Company
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                value={this.state.company}
                placeholder="Company Name"
                onChange={event => this.handleChange('company', event.target.value)}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalStart" validationState={this.getValidationState('start')}>
            <Col componentClass={ControlLabel} sm={2}>
              Start
            </Col>
            <Col sm={2}>
              <Datetime
                id="start-datepicker"
                closeOnSelect
                value={this.state.start}
                onChange={event => this.handleChange('start', event.valueOf())}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                defaultValue={moment().valueOf()}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEnd" validationState={this.getValidationState('end')}>
            <Col componentClass={ControlLabel} sm={2}>
              Start
            </Col>
            <Col sm={2}>
              <Datetime
                id="end-datepicker"
                closeOnSelect
                value={this.state.end}
                onChange={event => this.handleChange('end', event.valueOf())}
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                defaultValue={moment().valueOf()}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={4}>
              <div align="right">
                <Button
                  disabled={!this.validForm()}
                  type="submit"
                >Save
                </Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default ProcessDataEdit;
