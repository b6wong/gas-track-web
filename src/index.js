import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './components/App';
import * as stores from './stores';
import * as actions from './actions/index';
import Login from './components/Login';

import {useStrict} from 'mobx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
useStrict(true);

const {sessionStore} = stores;

// validate authentication for private routes
const requireAuth = (nextState, replace) => {

  if (!sessionStore.loggedIn()) {
    replace({ pathname: '/login' })
  } else {
    actions.setProfileFromLocal();
  }
}

// OnEnter for callback url to parse access_token
const parseAuthHash = (nextState, replace) => {
  if (nextState.location.hash) {
    actions.parseHash(nextState.location.hash)
    replace({ pathname: '/' });
  }
}

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={browserHistory}>
      <Route path='/' auth={sessionStore}>
        <IndexRedirect to="/home" />
        <Route path="home" component={App} onEnter={requireAuth} />
        <Route path="login" component={Login} onEnter={parseAuthHash} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

