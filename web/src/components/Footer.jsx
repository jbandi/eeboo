import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  render() {
    return (
      (process.env.NODE_ENV === 'development')
        ?
          <ErrorBoundary component="Footer">
            <div align="left">
              <hr />
              <Link to="#" onClick={() => { this.setState({ error: { id: '1' } }); }}>
                &nbsp; logger-test{this.state.error}
              </Link>
            </div>
          </ErrorBoundary>
        : <hr />
    );
  }
}

export default Footer;
