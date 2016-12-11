import React from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'
import {inject} from 'mobx-react'

@inject('sessionStore')
export class Login extends React.Component {

  googleLogin() {
    const {sessionStore} = this.props;
    sessionStore.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {

    return (
      <div>
        <h2>Login</h2>
          <ButtonToolbar>
            <Button bsStyle="link" onClick={this.googleLogin.bind(this)}>Login with Google</Button>
          </ButtonToolbar>
        
      </div>
    )
  }
}

export default Login;