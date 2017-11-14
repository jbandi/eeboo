import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Grid, Row, Col } from 'react-bootstrap';
import Auth from './../../services/Auth/Auth';
import { fetchProcs } from '../../state/actions/process';
import ProcessListRow from './../../containers/Admin/ProcessListRow';

class ProcessList extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    dispatch: PropTypes.func.isRequired,
    procs: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    if (this.props.procs.length <= 0) {
      this.props.dispatch(fetchProcs());
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={1} />
          <Col md={10}>
            <p align="right">
              <Link to="/admin/proc">add</Link>
            </p>
            {(!this.props.procs.length <= 0)
              ? <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Firma</th>
                    <th>Start</th>
                    <th>Ende</th>
                    <th>Status</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.procs.map(p => (
                    <ProcessListRow key={p} id={p} />
                  ))}
                </tbody>
              </Table>
              : <div>fetching process list</div>
            }
          </Col>
          <Col md={1} />
        </Row>
      </Grid>
    );
  }
}

export default ProcessList;
