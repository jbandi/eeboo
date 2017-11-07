import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Grid, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from './../../services/Auth/Auth';
import Questionaire from './Questionaire';
import Client from './../../containers/Admin/Client';
import { fetchProcs } from '../../state/actions/process';


const routes = [
  { path: '/admin/proc/:id/questionaires',
    main: () => <Questionaire />,
  },
  { path: '/admin/proc/:id/feedbackers',
    main: () => <h2>Feedbacker</h2>,
  },
  { path: '/admin/proc/:id/clients',
    main: id => <Client procId={id} />,
  },
  { path: '/admin/proc/:id/analysis',
    main: () => <h2>Analyis</h2>,
  },
  { path: '/admin/proc/:id/data',
    main: () => <h2>Data</h2>,
  },
];

class ProcessDetail extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
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

  render() {
    const id = this.props.match.params.id;
    return (
      <Grid className="home-content">
        <Row>
          <Col>
            Feedbackprozess: {id}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={2}>
            <Row>
              <Col>
                <ListGroup>
                  <LinkContainer to={`/admin/proc/${id}/questionaires`}>
                    <ListGroupItem eventkey={1}>Fragebogen</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to={`/admin/proc/${id}/feedbackers`}>
                    <ListGroupItem eventkey={2}>Feedbackgeber</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to={`/admin/proc/${id}/clients`}>
                    <ListGroupItem eventkey={3}>Feedbacknehmer</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to={`/admin/proc/${id}/analysis`}>
                    <ListGroupItem eventkey={4}>Analyse</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to={`/admin/proc/${id}/data`}>
                    <ListGroupItem eventkey={5}>Stammdaten</ListGroupItem>
                  </LinkContainer>
                </ListGroup>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <div style={{ flex: 1, padding: '10px' }}>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={() => route.main(id)}
                />
              ))}
            </div>
          </Col>
          <Col md={2} />
        </Row>
      </Grid>
    );
  }
}

export default ProcessDetail;
