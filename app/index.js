import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/container.js';
import Admin from './components/Admin/admin.js';
import Navbar from './components/Navbar/container.js';
import SignIn from './components/SignIn/container.js';
import SignOut from './components/SignOut/container.js';
import Error403 from './components/Error/error403.js';
import Error401 from './components/Error/error401.js';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';


ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/admin" component={Admin} />
        <Route path="/error403" component={Error403} />
        <Route path="/error401" component={Error401} />
        <Route path="/signin" component={SignIn} />
        <Route path="/logout" component={SignOut} />
        <Route path="/" component={App}>
        </Route>
    </Router>
    , document.body
);