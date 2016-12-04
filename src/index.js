import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './components/App';
import * as stores from './stores';
import Container from './components/Container';
import AuthService from './utils/AuthService';
import Login from './components/Login';

import {useStrict} from 'mobx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
useStrict(true);

const auth = new AuthService('vC4jjIJHyTK5PIortJYRIHa1iM8f3Pjm', 'b6wong.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    console.log("user not logged in");
    replace({ pathname: '/login' })
  }
}

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={browserHistory}>
      <Route path='/' component={Container} auth={auth}>
        <IndexRedirect to="/home" />
        <Route path="home" component={App} onEnter={requireAuth} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);



 
