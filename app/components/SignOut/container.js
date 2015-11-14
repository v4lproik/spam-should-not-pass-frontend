import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/container.js';
import AuthService from '../../services/AuthService.js';
import LoginStore from '../../stores/LoginStore.js';
import MemberInfoService from '../../services/MemberInformationService.js';

//css
require('../../public/css/login.css');

//img
require('../../public/img/key-login.jpg');

var SignIn = React.createClass({

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
            }.bind(this));

        LoginStore.clearUser();
    },

    render: function() {
        return (
            <div>
                LOGOUT
            </div>
        )
    }
});

module.exports = SignIn;
