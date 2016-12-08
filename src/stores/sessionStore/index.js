import Auth0Lock from 'auth0-lock';
import {browserHistory} from 'react-router'
//import { observable, action } from 'mobx';
//import { forEach } from 'lodash';

class SessionStore {

    constructor() {
        // Configure auth0
        this.lock = new Auth0Lock('vC4jjIJHyTK5PIortJYRIHa1iM8f3Pjm', 'b6wong.auth0.com', {
            auth: {
                redirect: false,
                redirectUrl: `${window.location.origin}/login`,
                responseType: 'token'
            },
            autoclose: true
        });
        // Add callback for lock 'authenticated' event
        this.lock.on('authenticated', this._doAuthentication.bind(this))
        // Add callback for lock 'authorization_error' event
        this.lock.on('authorization_error', this._authorizationError.bind(this))
        // binds login functions to keep this context
        this.login = this.login.bind(this)
    }

    _doAuthentication(authResult) {
        console.log("_doAuthentication");
        this.setToken(authResult.idToken);
        browserHistory.replace('/home');
        // Async loads the user profile data
        this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
                console.log('Error loading the Profile', error);
            } else {
                console.log(profile);
            }
        })
    }

    _authorizationError(error) {
        console.log('Authorization error', error);
    }

    /*
     setProfile(profile) {
    // Saves profile data to local storage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from local storage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }*/

    login() {
        this.lock.show();
    }

    loggedIn() {
        return !!this.getToken();
    }

    setToken(idToken) {
        console.log("setToken");
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    logout() {
        localStorage.removeItem('id_token');
        browserHistory.replace('/login');
    }

}

const sessionStore = new SessionStore();

export default sessionStore;
export { SessionStore };

