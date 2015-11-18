import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/container.js';
import Admin from './components/Admin/admin.js';
import Rule from './components/Admin/rule.js';
import Scheme from './components/Admin/scheme.js';
import Dashboard from './components/Admin/dashboard.js';
import Navbar from './components/Navbar/container.js';
import SignIn from './components/SignIn/container.js';
import SignUp from './components/SignUp/container.js';
import SignUpConfirmation from './components/SignUp/confirmation.js';
import SignOut from './components/SignOut/container.js';
import Error403 from './components/Error/error403.js';
import SessionExpired from './components/Error/session.js';
import Error401 from './components/Error/error401.js';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/admin" component={Admin}>
            <Route path="rule" component={Rule}/>
            <Route path="dashboard" component={Dashboard}/>
            <Route path="scheme" component={Scheme}/>
        </Route>
        <Route path="/error403" component={Error403} />
        <Route path="/session-expired" component={SessionExpired} />
        <Route path="/error401" component={Error401} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup/confirmation" component={SignUpConfirmation} />
        <Route path="/logout" component={SignOut} />
        <Route path="/" component={App}>
        </Route>
    </Router>
    , document.body
);