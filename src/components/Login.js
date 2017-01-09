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

  facebookLogin() {
    const {sessionStore} = this.props;
    sessionStore.login({
      connection: 'facebook'
    }, function(err) {
      if (err) alert("something went wrong: " + err.message);
    });
  }

  render() {

    return (
      <div>
        <h2>Login</h2>
          <ButtonToolbar>
            <button className="auth0-lock-social-button auth0-lock-social-big-button" onClick={this.googleLogin.bind(this)} data-provider="google-oauth2" type="button">
              <div className="auth0-lock-social-button-icon"></div>
              <div className="auth0-lock-social-button-text">Log in with Google</div>
            </button>
  
            <Button bsStyle="link" onClick={this.facebookLogin.bind(this)}>Login with Facebook</Button>
          </ButtonToolbar>
        
      </div>
    )
  }
}

export default Login;