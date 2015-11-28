import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import Navbar from '../Navbar/container.js';
import AuthService from '../../../services/AuthService.js';
import LoginStore from '../../../stores/LoginStore.js';
import MemberInfoService from '../../../services/MemberService.js';
import SessionService from '../../../services/SessionService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised, redirectionAdmin} from '../../Utility/redirection.js';


//css
require('../../../public/css/error.css');

var SignOut = React.createClass({

    componentDidMount: function() {
        this.interval = setInterval(() => this.props.history.replaceState(null, '/'), 1000);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        return (
            <div id="error-container-redirection">
                <section className="error-content-redirection error-403 js-error-container-redirection">
                    <section className="error-details-redirection">
                        <section className="error-message-redirection">
                            <h1 className="error-code-redirection"></h1>
                            <h2 className="error-description-redirection">You have been logged out</h2>
                            <Link to="/" className="error-link-redirection" >Redirection in 5 seconds or click here →</Link>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = SignOut;