import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, FormGroup, FormControl, Table, Button } from 'react-bootstrap';
import Auth from './../../services/Auth/Auth';

class ProcessAdd extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    addProc: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      company: '',
      start: '',
      end: '',
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

  handleCompany = (e) => {
    this.setState({ company: e.target.value });
  }
  handleStart = (e) => {
    this.setState({ start: e.target.value });
  }
  handleEnd = (e) => {
    this.setState({ end: e.target.value });
  }

  handleSubmit = (event) => {
    this.props.addProc({
      company: this.state.company,
      start: this.state.start,
      end: this.state.end,
    });
    event.preventDefault();
  }

  render() {
    return (
      <Grid className="process-detail">
        <Row>
          <Col md={2} />
          <Col md={8}>
            <FormGroup
              controlId="processAdd"
            >
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
                      <FormControl
                        type="text"
                        value={this.state.start}
                        onChange={this.handleStart}
                        placeholder="Start"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>End Datum:</td>
                    <td>
                      <FormControl
                        type="text"
                        value={this.state.end}
                        onChange={this.handleEnd}
                        placeholder="End"
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <p align="right">
                <Button onClick={this.handleSubmit}>Add</Button>
              </p>
            </FormGroup>
          </Col>
          <Col md={2} />
        </Row>
      </Grid>
    );
  }
}


export default ProcessAdd;
