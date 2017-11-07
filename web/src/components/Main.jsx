import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Admin from './Admin';
import FeedbackerWithId from './../containers/Feedbacker/Feedbacker';
import Callback from './../Callback/Callback';

import Auth from './../services/Auth/Auth';
import Header from './Header';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      (auth.isAuthenticated() && auth.userHasRoles(['admin'])) ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location },
        }}
        />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const Feedbacker = ({ component: Component, ...rest }) => {
  const id = rest.location.pathname.split('/')[rest.location.pathname.split('/').length - 1];
  return <Component feedbackerId={id} {...rest} />;
};

Feedbacker.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const Main = () => (
  <div>
    <Header auth={auth} />
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home auth={auth} {...props} />}
        />
        <Route
          exact
          path="/home"
          render={props => <Home auth={auth} {...props} />}
        />
        <Route
          path="/feedbacker/:id"
          render={props => <Feedbacker component={FeedbackerWithId} auth={auth} {...props} />}
        />
        <Route
          path="/about"
          render={props => <PrivateRoute component={About} auth={auth} {...props} />}
        />
        <Route
          path="/admin"
          render={props => <Admin auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </Switch>
    </main>
  </div>
);

export default Main;
