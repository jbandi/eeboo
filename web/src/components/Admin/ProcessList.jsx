import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          <Col md={2} />
          <Col md={8}>
            {(!this.props.procs.length <= 0)
              ? <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Firma</th>
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
          <Col md={2} />
        </Row>
      </Grid>
    );
  }
}

export default ProcessList;
