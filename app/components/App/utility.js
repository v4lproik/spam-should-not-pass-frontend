import LoginStore from '../../stores/LoginStore.js';

function redirectionError(history, code) {

    if (typeof code === undefined && code === 'null' && code === ''){
        return;
    }

    switch (code){
        case 403:
            LoginStore.clearUser();
            history.pushState(null, '/error403');
            break;

        case 401:
            LoginStore.clearUser();
            history.pushState(null, '/error401');
            break;

        case 0:
            history.pushState(null, '/unavailable');
            break;
    }
}

function redirectionSignup(history) {
    history.pushState(null, '/signup');
}

function redirectionSessionExpired(history) {
    history.pushState(null, '/session-expired');
}

function redirectionUnauthorised(history) {
    history.pushState(null, '/error401');
}

function redirectionAdmin(history) {
    window.location = 'http://localhost:3000/admin';
}

export {redirectionError, redirectionSessionExpired, redirectionUnauthorised, redirectionAdmin, redirectionSignup}