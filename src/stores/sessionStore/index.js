import Auth0 from 'auth0-js';
import {browserHistory} from 'react-router'
import { observable, action } from 'mobx';
//import { forEach } from 'lodash';


class SessionStore {

    @observable userEmail;
    @observable userName;

    constructor() {

        this.userEmail = null;
        this.userName = null;

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

    @action parseHash(hash) {
        // uses auth0 parseHash method to extract data from url hash
        const authResult = this.auth0.parseHash(hash)
        if (authResult && authResult.idToken) {
            this.setToken(authResult.idToken)
            this.auth0.getProfile(authResult.idToken, (err, profile) => {
                if (err) {
                    console.log('error getting profile: ', err);
                } else {
                    this.setProfile(profile);
                }
            });

        }
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        return !!this.getToken();
    }

    getAuth0() {
        return this.auth0;
    }

    setToken(idToken) {
        // Saves user token to local storage
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        // Retrieves the user token from local storage
        return localStorage.getItem('id_token');
    }

    @action setProfile(profile) {
        this.userEmail = profile.email;
        this.userName = profile.name;
        console.log(this.userEmail);
        console.log(this.userName);
        localStorage.setItem('profile', profile);
    }

    getProfile() {
        return localStorage.getItme('profile');
    }

    getUserEmail() {
        return this.userEmail;
    }

    getUserName() {
        return this.userName;
    }

    @action logout() {
        this.userEmail = null;
        this.userName = null;
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        browserHistory.replace('/login');
    }

}

const sessionStore = new SessionStore();

export default sessionStore;
export { SessionStore };

