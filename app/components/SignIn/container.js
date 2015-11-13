import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/container.js';

//css
require('../../public/css/login.css');

//img
require('../../public/img/key-login.jpg');

var SignIn = React.createClass({
    getServerResponse: function(datax){
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/auth/',
            dataType: 'json',
            data: datax,
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var author = this.refs.loginname.value.trim();
        var password = this.refs.password.value.trim();
        if (!password || !author) {
            return;
        }

        this.getServerResponse("{\"login\": \"test\", \"password\": \"test\"}");
        return;
    },
    getInitialState: function() {
        return {data: ['']};
    },
    //componentDidMount: function() {
    //    $.ajax({
    //        url: 'http://localhost:8080/api/',
    //        dataType: 'json',
    //        cache: false,
    //        success: function(data) {
    //            this.setState({data: data});
    //        }.bind(this),
    //        error: function(xhr, status, err) {
    //            console.error(this.props.url, status, err.toString());
    //        }.bind(this)
    //    });
    //},
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
