import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/container.js';
import {redirectionError, redirectionAdmin} from '../../Utility/redirection.js';
import AuthService from '../../../services/AuthService.js';
import MemberInfoService from '../../../services/MemberService.js';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import { Link, IndexLink } from 'react-router';

//css
require('../../../public/css/login.css');

var SignUpConfirmation = React.createClass({

    getInitialState: function() {
        return {registered: true};
    },

    componentDidMount: function() {
        if (!this.state.registered){
            this.props.history.pushState(null, '/');
        }
    },

    render: function() {
        return (
            <div>
                <div id="login-box" className="container">
                    <div className="row">
                        <div className="col-sm-2 col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <strong> Verification</strong>
                                </div>
                                <div className="panel-body">
                                    Congratulations. <strong>Your account has been created ! </strong><br /><br />
                                    In order to complete your registration, please click the confirmation link in the email that we have sent to you.
                                </div>
                                <div className="panel-footer ">
                                    Already have confirmed your new account! <Link to="/signin">Sign in Here </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = SignUpConfirmation;