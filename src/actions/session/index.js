import sessionStore from '../../stores/sessionStore';
import { clearGasLog, fetchVehicles } from '../../actions/gasLog';

export function logout() {
    clearGasLog();
    sessionStore.logout();
}

export function parseHash(hash) {
    const auth0 = sessionStore.getAuth0();
    // uses auth0 parseHash method to extract data from url hash
    const authResult = auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
        sessionStore.setToken(authResult.idToken)
        auth0.getProfile(authResult.idToken, (err, profile) => {
            if (err) {
                console.log('error getting profile: ', err);
            } else {
                sessionStore.setProfile(profile);
                fetchVehicles(profile.email);
            }
        });
    }
}

export function setProfileFromLocal() {
    sessionStore.setProfileFromLocal();
    fetchVehicles(sessionStore.getUserEmail());
}
