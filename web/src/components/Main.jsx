
import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './Home';
import About from './About';
import Admin from './Admin';
import Callback from './../Callback/Callback';
import Auth from './../services/Auth/Auth';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' render={(props) => <Home auth={auth} {...props} />} />
      <Route path='/about' render={(props) => <About auth={auth} {...props} />} />
      <Route path='/admin' render={(props) => <Admin auth={auth} {...props} />} />
      <Route path="/callback" render={(props) => {
        handleAuthentication(props);
        return <Callback {...props} />
      }}/>
    </Switch>
  </main>
)

export default Main;
