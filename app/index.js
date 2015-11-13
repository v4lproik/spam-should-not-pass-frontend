import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/container.js';
import Navbar from './components/Navbar/container.js';
import SignIn from './components/SignIn/container.js';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';


ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/signin" component={SignIn} />
        <Route path="/" component={App}>
        </Route>
    </Router>
    , document.body
);