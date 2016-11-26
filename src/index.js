import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import * as stores from './stores';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {useStrict} from 'mobx';

useStrict(true);

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={App} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);



 
