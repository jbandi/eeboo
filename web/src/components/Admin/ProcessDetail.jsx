import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Grid, Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchProcs } from './../../state/actions/process';
import { fetchFeedbackersByProcId } from './../../state/actions/feedbacker';
import QuestionaireList from './../../containers/Admin/QuestionaireList';
import ClientList from './../../containers/Admin/ClientList';
import ClientDetail from './../../containers/Admin/ClientDetail';
import FeedbackerList from './../../containers/Admin/FeedbackerList';
import ProcessData from './../../containers/Admin/ProcessData';

const routes = [
  {
    path: '/admin/proc/:id/clients',
    main: id => <ClientList procId={id} />,
  },
  {
    path: '/admin/proc/:id/questionaires',
    main: id => <QuestionaireList procId={id} />,
  },
  {
    path: '/admin/proc/:id/feedbackers',
    main: id => <FeedbackerList procId={id} />,
  },
  {
    path: '/admin/proc/:id/analysis',
    main: () => <h2>Analyis</h2>,
  },
  {
    path: '/admin/proc/:id/data',
    main: id => <ProcessData procId={id} />,
  },
];

class ProcessDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(fetchProcs());
    this.props.dispatch(fetchFeedbackersByProcId(this.props.match.params.id));
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <Grid className="process-detail">
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
            <div style={{ flex: 1, padding: '10px' }}>
              {routes.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={() => route.main(id)}
                />
              ))}
              <Route
                key="/admin/proc/gaga/:id/gaga/:clientId"
                path="/admin/proc/:id/gaga/:clientId"
                component={params => <ClientDetail params={params} />}
              />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ProcessDetail;
