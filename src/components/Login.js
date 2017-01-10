import React from 'react'
import {inject} from 'mobx-react'
import {Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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
      <div className="fullScreen">
      <Grid fluid={true}>
        <Row>
          <Col xs={10} xsOffset={1} md={4} mdOffset={4} className="loginHeader">
          
            <h2>Log in</h2>
          
            <button className="btn-google" onClick={this.googleLogin.bind(this)}>
              <FontAwesome 
                name="google" 
                className="icon-google"
                />
            </button>
            <button className="btn-facebook" onClick={this.facebookLogin.bind(this)}>
              <FontAwesome 
                name="facebook" 
                className="icon-facebook"
              />
            </button>
          </Col>
        </Row>
      </Grid>
      </div>

    )
  }
}

export default Login;
