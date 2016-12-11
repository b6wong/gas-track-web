import Auth0 from 'auth0-js';
import {browserHistory} from 'react-router'
//import { observable, action } from 'mobx';
//import { forEach } from 'lodash';

class SessionStore {

    constructor() {
        //Configure Auth0
        this.auth0 = new Auth0({
            clientID: 'vC4jjIJHyTK5PIortJYRIHa1iM8f3Pjm',
            domain: 'b6wong.auth0.com',
            callbackURL: `${window.location.origin}/login`,
            callbackOnLocationHash: true
        });
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    login(params, onError) {
        //redirects the call to auth0 instance
        this.auth0.login(params, onError);
    }

    signup(params, onError) {
        //redirects the call to auth0 instance
        this.auth0.signup(params, onError);
    }

    parseHash(hash) {
        // uses auth0 parseHash method to extract data from url hash
        const authResult = this.auth0.parseHash(hash)
        if (authResult && authResult.idToken) {
            this.setToken(authResult.idToken)
        }
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        return !!this.getToken();
    }

    setToken(idToken) {
        // Saves user token to local storage
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        // Retrieves the user token from local storage
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

