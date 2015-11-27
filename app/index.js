import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Vitrine/container.js';
import Admin from './components/Admin/admin.js';
import RuleDetails from './components/Admin/Rule/details.js';
import RuleAdd from './components/Admin/Rule/add.js';
import RuleIndex from './components/Admin/Rule/index.js';
import SettingsIndex from './components/Admin/Settings/index.js';
import ApiIndex from './components/Admin/Api/index.js';
import DocIndex from './components/Admin/Documentation/index.js';
import FaqIndex from './components/Admin/Faq/index.js';
import ProfileIndex from './components/Admin/Profile/index.js';
import RuleList from './components/Admin/Rule/list.js';
import Scheme from './components/Admin/Scheme/scheme.js';
import Dashboard from './components/Admin/Dashboard/dashboard.js';
import Navbar from './components/Vitrine/Navbar/container.js';
import SignIn from './components/Vitrine/SignIn/container.js';
import SignUp from './components/Vitrine/SignUp/container.js';
import SignUpConfirmation from './components/Vitrine/SignUp/confirmation.js';
import SignOut from './components/Vitrine/SignOut/container.js';
import Error403 from './components/Error/error403.js';
import Error404 from './components/Error/error404.js';
import SessionExpired from './components/Error/session.js';
import Unavailable from './components/Error/unavailable.js';
import Error401 from './components/Error/error401.js';
import SessionService from './services/SessionService.js';
import MemberInfoService from './services/MemberService.js';
import AuthService from './services/AuthService.js';
import LoginStore from './stores/LoginStore.js';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

function requireAuth(nextState, replaceState) {
    var user = LoginStore.getUser();

    if (user === null) {
        replaceState({ nextPathname: nextState.location.pathname }, '/error401');
        return;
    }else{
        if (!SessionService.isValid(user.lastUpdate)){
            LoginStore.clearUser();
            replaceState({ nextPathname: nextState.location.pathname }, '/session-expired');
            return;
        }

        MemberInfoService.info(user.token)
            .then(function(data){
                LoginStore.setUser(data);
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    }
}

function killSession(nextState, replaceState) {
    var user = LoginStore.getUser();

    if (user !== null) {
        AuthService.logout(user.token);
        LoginStore.clearUser();
    }else{
        replaceState({ nextPathname: nextState.location.pathname }, '/');
    }
}

function requireNotAuth(nextState, replaceState) {
    var user = LoginStore.getUser();

    if (user !== null) {
        if (SessionService.isValid(user.lastUpdate)){
            replaceState({ nextPathname: nextState.location.pathname }, '/');
        }
    }
}

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/admin" component={Admin}>
            <IndexRoute component={Dashboard} onEnter={requireAuth}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
            <Route path="scheme" component={Scheme} onEnter={requireAuth}/>
            <Route path="api" component={ApiIndex} onEnter={requireAuth}/>
            <Route path="documentation" component={DocIndex} onEnter={requireAuth}/>
            <Route path="faq" component={FaqIndex} onEnter={requireAuth}/>
            <Route path="profile" component={ProfileIndex} onEnter={requireAuth}/>
            <Route path="settings" component={SettingsIndex} onEnter={requireAuth}/>
            <Route path="rule" component={RuleIndex}>
                <IndexRoute component={RuleList} onEnter={requireAuth}/>
                <Route path="list" component={RuleList} onEnter={requireAuth}/>
                <Route path="detail/:ruleID" component={RuleDetails} onEnter={requireAuth}/>
                <Route path="add" component={RuleAdd} onEnter={requireAuth}/>
            </Route>
        </Route>
        <Route path="/logout" component={SignOut} onEnter={killSession}/>

        <Route path="/error403" component={Error403} />
        <Route path="/error404" component={Error404} />
        <Route path="/session-expired" component={SessionExpired} />
        <Route path="/error401" component={Error401} />
        <Route path="/unavailable" component={Unavailable} />

        <Route path="/" component={App}/>
        <Route path="/signin" component={SignIn} onEnter={requireNotAuth}/>
        <Route path="/signup" component={SignUp} onEnter={requireNotAuth}/>
        <Route path="/signup/confirmation" component={SignUpConfirmation} onEnter={requireNotAuth}/>
    </Router>
    , document.body
);