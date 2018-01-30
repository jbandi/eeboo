import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Grid, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import QuestionaireList from './../../containers/Admin/Questionaire/QuestionaireList';
import ClientList from './../../containers/Admin/Client/ClientList';
import ClientDetail from './../../containers/Admin/Client/ClientDetail';
import FeedbackerList from './../../containers/Admin/Feedbacker/FeedbackerList';
import ProcessData from './../../containers/Admin/ProcessData';
import Analysis from './../../containers/Admin/Analysis/Analysis';

const routes = [
  {
    path: '/admin/proc/:id/clients',
    main: (id, props) => <ClientList procId={id} {...props} />,
  },
  {
    path: '/admin/proc/:id/questionaires',
    main: id => <QuestionaireList procId={id} />,
  },
  {
    path: '/admin/proc/:id/feedbackers',
    main: (id, props) => <FeedbackerList procId={id} {...props} />,
  },
  {
    path: '/admin/proc/:id/analysis',
    main: id => <Analysis procId={id} />,
  },
  {
    path: '/admin/proc/:id/data',
    main: (id, props) => <ProcessData procId={id} {...props} />,
  },
];

class ProcessDetail extends Component {
  static propTypes = {
    auth: PropTypes.shape({}).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
    process: PropTypes.shape({
      company: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
    fetchProcs: PropTypes.func.isRequired,
    fetchFeedbackersByProcId: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchProcs(this.props.auth);
    this.props.fetchFeedbackersByProcId(this.props.auth, this.props.match.params.id);
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <Grid className="process-detail">
        <Row>
          <Col>
            <div align="left">
              Feedbackprozess: {this.props.process.company}
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={2}>
            <Row>
              <Col>
                <ListGroup>
                  <LinkContainer to={`/admin/proc/${id}/clients`}>
                    <ListGroupItem eventkey={0}>Feedbacknehmer</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to={`/admin/proc/${id}/questionaires`}>
                    <ListGroupItem eventkey={2}>Fragebogen</ListGroupItem>
                  </LinkContainer>
                  <LinkContainer to={`/admin/proc/${id}/feedbackers`}>
                    <ListGroupItem eventkey={3}>Feedbackgeber</ListGroupItem>
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
          <Col md={10}>
            <div style={{ padding: '10px' }}>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={() => route.main(id, this.props)}
                />
              ))}
              <Route
                key="/admin/proc/gaga/:id/gaga/:clientId"
                path="/admin/proc/:id/gaga/:clientId"
                component={params => <ClientDetail params={params} auth={this.props.auth} />}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProcessDetail;
