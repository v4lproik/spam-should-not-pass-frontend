import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import Navbar from '../Navbar/container.js';
import AuthService from '../../services/AuthService.js';
import LoginStore from '../../stores/LoginStore.js';
import MemberInfoService from '../../services/MemberInformationService.js';

//css
require('../../public/css/error.css');

var SignOut = React.createClass({

    componentDidMount: function() {

        var user = LoginStore.getUser();

        if (user === null) {
            return;
        }

        console.log("Verify user info with " + user.token);

        MemberInfoService.info(user.token)
            .then(function (data) {
                console.log("Token has been destroyed");

                AuthService.logout(user.token);
                LoginStore.clearUser();

            }.bind(this));
    },

    render: function() {
        return (
            <div id="error-container">
                <section className="error-content error-403 js-error-container">
                    <section className="error-details">
                        <section className="error-message">
                            <h1 className="error-code"></h1>
                            <h2 className="error-description">You have been logged out</h2>
                            <Link to="/" className="error-link" >Redirection in 3 seconds or click here →</Link>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = SignOut;