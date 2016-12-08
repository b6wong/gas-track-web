// src/views/Main/Login/Login.js

import React from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import {inject} from 'mobx-react'

@inject('sessionStore')
export class Login extends React.Component {

  render() {

    const {sessionStore} = this.props;

    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={sessionStore.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;