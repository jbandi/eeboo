import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Grid, PanelGroup, Panel } from 'react-bootstrap';
import FeedbackerQuestions from '../containers/FeedbackerQuestions';
import PanelHeader from '../containers/PanelHeader';

class Feedbacker extends Component {
  static propTypes = {
    contextIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  static defaultProps = {
    feedbackerId: '',
  }

  constructor() {
    super();
    this.state = {
      activeKey: 1,
    };
  }

  handleSelect = (activeKey) => {
    this.setState({ activeKey });
  }

  header = contextId => (
    <div><PanelHeader contextId={contextId} /></div>
  )

  render() {
    return (
      <div>
        <Grid className="home-content">
          <Row>
            <Col xs={6} md={2} />
            <Col xs={6} md={8}>
              <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
                { this.props.contextIds.map(contextId => (
                  <Panel
                    key={contextId}
                    collapsible
                    header={this.header(contextId)}
                    eventKey={contextId}
                  >
                    <FeedbackerQuestions contextId={contextId} />
                  </Panel>))
                }
              </PanelGroup>
            </Col>
            <Col xsHidden md={2} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Feedbacker;
