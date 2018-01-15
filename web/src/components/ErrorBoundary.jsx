import React from 'react';
import PropTypes from 'prop-types';
import * as Rollbar from 'rollbar';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    component: PropTypes.string,
  }
  static defaultProps = {
    component: 'unknown',
  }

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
    const rollbar = new Rollbar({
      accessToken: 'c4a509fe9ed14a578b89c6dde50c49df',
      captureUncaught: false,
      captureUnhandledRejections: true,
      payload: {
        environment: process.env.NODE_ENV,
        component: this.props.component,
      },
    });
    console.log('error in component:', this.props.component);
    rollbar.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Grid>
          <Row>
            <Col md={2} />
            <Col md={8}>
              <Jumbotron>
                <div align="center">
                  <h2>... ooops, we have detected an error ...</h2>
                  <p>Please reload your browser</p>
                </div>
              </Jumbotron>
            </Col>
            <Col md={2} />
          </Row>
        </Grid>
      );
    }
    return this.props.children;
  }
}


export default ErrorBoundary;
