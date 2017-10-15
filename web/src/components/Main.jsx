import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Admin from './Admin';
import Feedbacker from './../containers/Feedbacker';
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
          exact
          path="/feedbacker/:id"
          render={props => <Feedbacker auth={auth} {...props} />}
        />
        <Route
          path="/about"
          render={props => <PrivateRoute component={About} auth={auth} {...props} />}
        />
        <Route
          path="/admin"
          render={props => <PrivateRoute component={Admin} auth={auth} {...props} />}
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
