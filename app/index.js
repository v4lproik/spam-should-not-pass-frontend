import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/container.js';
import Admin from './components/Admin/admin.js';
import RuleDetails from './components/Admin/rule_details.js';
import RuleIndex from './components/Admin/rule_index.js';
import RuleList from './components/Admin/rule_list.js';
//import ClickableTr from './components/Admin/clickable_tr.js';
import Scheme from './components/Admin/scheme.js';
import Dashboard from './components/Admin/dashboard.js';
import Navbar from './components/Navbar/container.js';
import SignIn from './components/SignIn/container.js';
import SignUp from './components/SignUp/container.js';
import SignUpConfirmation from './components/SignUp/confirmation.js';
import SignOut from './components/SignOut/container.js';
import Error403 from './components/Error/error403.js';
import Error404 from './components/Error/error404.js';
import SessionExpired from './components/Error/session.js';
import Unavailable from './components/Error/unavailable.js';
import Error401 from './components/Error/error401.js';
import SessionService from './services/SessionService.js';
import MemberInfoService from './services/MemberService.js';
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

function requireNotAuth(nextState, replaceState) {
    var user = LoginStore.getUser();

    if (user !== null) {
        if (SessionService.isValid(user.lastUpdate)){
            window.location = 'http://localhost:3000/admin';
        }
    }
}

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/admin" component={Admin}>
            <Route path="rule/list" component={RuleList} onEnter={requireAuth}/>
            <Route path="rule/detail" component={RuleDetails} onEnter={requireAuth}/>
            <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
            <Route path="scheme" component={Scheme} onEnter={requireAuth}/>
        </Route>
        <Route path="/logout" component={SignOut} onEnter={requireAuth}/>

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