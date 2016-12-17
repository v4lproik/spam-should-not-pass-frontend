import React from 'react';
import {redirectionError} from '../../Utility/redirection.js';
import MemberInfoService from '../../../services/MemberService.js';
import PlatformException from '../../../models/PlatformException.js';
import {Link} from 'react-router';

//css
require('../../../public/css/login.css');

//img
require('../../../public/img/key-login.jpg');

var SignUp = React.createClass({

    handleSubmit: function(e) {

        e.preventDefault();

        if (this.refs.signup.getAttribute('class').includes('disabled')) {
            return;
        }

        var firstname = this.refs.firstname.value.trim();
        var lastname = this.refs.lastname.value.trim();
        var password = this.refs.password.value.trim();
        var cpassword = this.refs.cpassword.value.trim();
        var email = this.refs.email.value.trim();
        var corporation = this.refs.corporation.value.trim();

        if (!password || !firstname || !lastname || !email || !corporation || !cpassword) {
            return;
        }

        MemberInfoService.create(firstname, lastname, email, corporation, password).then(function(/*data*/) {
            this.props.history.pushState({
                registered: true
            }, '/signup/confirmation');
        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
                console.error(err);
                if (err.status == 500 && err.message === 'Email is already taken') {
                    alert(err);
                }
                redirectionError(this.props.history, err.status);

            }
        }.bind(this));

    },

    render: function() {
        return (
            <div>
                <div id="login-box" className="container">
                    <div className="row">
                        <div className="col-sm-2 col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <strong>
                                        Sign up to continue</strong>
                                </div>
                                <div className="panel-body">
                                    <form role="form" data-toggle="validator" noValidate="true" onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <div className="row">
                                                <div className="center-block"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="glyphicon glyphicon-user"></i>
                                                            </span>
                                                            <input className="form-control" placeholder="Firstname" name="firstname" type="text" autofocus ref="firstname" required/>
                                                            <input className="form-control" placeholder="Lastname" name="lastname" type="text" autofocus ref="lastname" required/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="glyphicon glyphicon-envelope"></i>
                                                            </span>
                                                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" data-error="Please enter a valid email" ref="email" required/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="glyphicon glyphicon-briefcase"></i>
                                                            </span>
                                                            <input className="form-control" placeholder="Corporation" name="corporation" type="text" autofocus ref="corporation" required/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-group col-sm-6 remove-padding-left">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="glyphicon glyphicon-lock"></i>
                                                                </span>
                                                                <input type="password" data-toggle="validator" data-minlength="6" className="form-control" id="inputPassword" placeholder="Password" required ref="password"/>
                                                            </div>
                                                            <span className="help-block">Minimum of 6 characters</span>

                                                        </div>
                                                        <div className="form-group col-sm-6 remove-padding-right">
                                                            <div className="input-group">
                                                                <span className="input-group-addon">
                                                                    <i className="glyphicon glyphicon-lock"></i>
                                                                </span>
                                                                <input type="password" className="form-control" id="inputPasswordConfirm" data-match="#inputPassword" data-match-error="Whoops, these don't match" placeholder="Confirm" required ref="cpassword"/>
                                                            </div>
                                                            <div className="help-block with-errors"></div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign up" ref="signup"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="panel-footer ">
                                    Already have an account!
                                    <Link to="/signin">Sign in Here
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = SignUp;
