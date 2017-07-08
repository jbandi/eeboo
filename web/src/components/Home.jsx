import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

class Home extends Component {

  state = { users: [] }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render () {
    return (
      <Grid className="home-content">
        <Row>
          <Col xs={6} md={2}></Col>
          <Col xs={6} md={8}>
            <h1>Users from API</h1>
            {this.state.users.map(user =>
              <div key={user.id}>{user.username}</div>
            )}
          </Col>
          <Col xsHidden md={2}></Col>
        </Row>
      </Grid>
    )
  }
}


export default Home;
