import React, { Component } from 'react';

class About extends Component {

  componentWillMount() {
    this.setState({ profile: {} });
    const { authFetch} = this.props.auth;
    const API_URL = '/api';
    authFetch(`${API_URL}/private`)
      .then(data => this.setState({ message: data.message }))
      .catch(error => this.setState({ message: error.message }));
  }

  render() {
    return(
      <div>
            <pre>{this.state.message}</pre>
      </div>
    )
  }
}

export default About;
