import { observable, action } from 'mobx';
//import { forEach } from 'lodash';
import AuthService from '../../utils/AuthService';

class SessionStore {

    @observable auth;
    
    constructor() {
        this.auth = new AuthService('vC4jjIJHyTK5PIortJYRIHa1iM8f3Pjm', 'b6wong.auth0.com');
    }

    @action reset = () => {
    }

    getAuth() {
        return this.auth;
    }

    @action logout = () => {
        this.auth.logout();
    }

}

const sessionStore = new SessionStore();

export default sessionStore;
export { SessionStore };

