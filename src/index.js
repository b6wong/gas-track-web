import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import App from './components/App';
import * as stores from './stores';
import Login from './components/Login';

import {useStrict} from 'mobx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
useStrict(true);

const {sessionStore} = stores;

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  console.log("in requireAuth");
  console.log(nextState.location);
  console.log(nextState.location.hash);
  if (nextState.location.hash) {
    const hashString = nextState.location.hash;
    const idString = '&id_token';
    const firstIndex = hashString.indexOf(idString) + idString.length + 1;
    const lastIndex = hashString.indexOf('&token_type=');
    console.log(hashString.substring(firstIndex, lastIndex));
    sessionStore.setToken(hashString.substring(firstIndex, lastIndex));
  }
  if (!sessionStore.loggedIn()) {
    replace({ pathname: '/login' })
  } else {
    //console.log("user is already logged in... token is: ", sessionStore.getToken());
  }
}

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={browserHistory}>
      <Route path='/' auth={sessionStore}>
        <IndexRedirect to="/home" />
        <Route path="home" component={App} onEnter={requireAuth} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);



 
