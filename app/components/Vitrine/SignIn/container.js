import React from 'react';
import {redirectionError, redirectionAdmin} from '../../Utility/redirection.js';
import AuthService from '../../../services/AuthService.js';
import MemberInfoService from '../../../services/MemberService.js';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import {Link} from 'react-router';

//css
require('../../../public/css/login.css');

//img
require('../../../public/img/key-login.jpg');

var SignIn = React.createClass({

    getInitialState: function() {
        return {error: false};
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.loginname.value.trim();
        var password = this.refs.password.value.trim();
        if (!password || !author) {
            return;
        }

        AuthService.login(author, password).then(function(user) {
            LoginStore.setUser(user);

            MemberInfoService.info(user.token).then(function(/*data*/) {
                redirectionAdmin(this.props.history);
            }.bind(this)).catch(function(err) {
                if (err instanceof PlatformException.constructor) {
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
                console.log(err.code);
                redirectionError(this.props.history, err.code);

                this.setState({error: true});
            }
        }.bind(this));
    },

    isError: function() {
        if (this.state.error) {
            return (
                <div className="alert alert-danger fade in">
                    <center>
                        <strong>Password or username
                        </strong>
                        is wrong.</center>
                </div>
            );
        }
    },

    render: function() {

        return (
            <div>
                <div id="login-box" className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <strong>
                                        Sign in to continue</strong>
                                </div>
                                <div className="panel-body">
                                    <form role="form" onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <div className="row">
                                                <div className="center-block">
                                                    <img className="profile-img" src="img/key-login.jpg" alt="" size="10"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                                                    {this.isError()}
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="glyphicon glyphicon-user"></i>
                                                            </span>
                                                            <input className="form-control" placeholder="Username" name="loginname" type="text" autofocus ref="loginname"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <span className="input-group-addon">
                                                                <i className="glyphicon glyphicon-lock"></i>
                                                            </span>
                                                            <input className="form-control" placeholder="Password" name="password" type="password" ref="password"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign in"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="panel-footer ">
                                    Don't have an account!
                                    <Link to="/signup">Sign Up Here
                                    </Link><br/>
                                    Go back to main website!
                                    <Link to="/">Click Here
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

module.exports = SignIn;
