import sessionStore from '../../stores/sessionStore';

export function logout() {
    sessionStore.logout();
}
