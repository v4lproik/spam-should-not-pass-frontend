import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/container.js';
import AuthService from '../../service/AuthService.js';
import LoginStore from '../../stores/LoginStore.js';

//css
require('../../public/css/login.css');

//img
require('../../public/img/key-login.jpg');

var SignIn = React.createClass({

    componentDidMount: function() {
        var user = LoginStore.getUser();
        if(user !== 'undefined'){
            this.props.history.pushState(null, '/admin');
            return;
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.loginname.value.trim();
        var password = this.refs.password.value.trim();
        if (!password || !author) {
            return;
        }

        AuthService.login(author, password);
        return;
    },

    getInitialState: function() {
        return {data: ['']};
    },

    render: function() {
        return (
            <div>
                {this.state.data}
                <div id="login-box" className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <strong> Sign in to continue</strong>
                                </div>
                                <div className="panel-body">
                                    <form role="form" onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <div className="row">
                                                <div className="center-block">
                                                    <img className="profile-img"
                                                         src="img/key-login.jpg" alt="" size="10" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-10  col-md-offset-1 ">
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
                                                            <input className="form-control" placeholder="Password" name="password" type="password" ref="password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="submit" className="btn btn-lg btn-primary btn-block" value="Sign in" />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="panel-footer ">
                                    Don't have an account! <a href="#" onClick=""> Sign Up Here </a>
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
