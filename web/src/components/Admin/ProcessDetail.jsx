import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Grid, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from './../../services/Auth/Auth';
import Questionaire from './Questionaire';


const routes = [
  { path: '/admin/proc/:id/questionaires',
    main: () => <Questionaire />,
  },
  { path: '/admin/proc/:id/feedbackers',
    main: () => <h2>Feedbackers</h2>,
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
    const id = this.props.id;
    return (
      <Grid className="home-content">
        <Row>
          <Col md={2}>
            <Row>
              <Col>
                <ListGroup>
                  <LinkContainer to={`/admin/proc/${id}/questionaires`}>
                    <ListGroupItem eventKey={1}>Fragebogen</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to="/admin/proc/1/feedbackers">
                    <ListGroupItem eventKey={2}>Feedbackers</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to="/admin/proc/1/analysis">
                    <ListGroupItem eventKey={2}>Analyse</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to="/admin/proc/1/data">
                    <ListGroupItem eventKey={2}>Stammdaten</ListGroupItem>
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
                  component={route.main}
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
