import React from 'react';
import ReactDOM from 'react-dom';
import { Display } from 'react';
import { Link, IndexLink } from 'react-router';
import MemberInfoService from '../../services/MemberService.js';
import LoginStore from '../../stores/LoginStore.js';

var Navbar = React.createClass({

    getInitialState: function() {
        return {logged: false};
    },

    componentDidMount: function() {
        var user = LoginStore.getUser();

        if (user === null) {
            return;
        }

        console.log("Verify user info with " + user.token);

        MemberInfoService.info(user.token)
            .then(function(user){
                LoginStore.setUser(user);
                this.setState({
                    logged: true
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.status);
                }
            }.bind(this));
    },

    render: function() {
        return (
            <div className="navbar-wrapper">
                <div className="container">
                    <nav className="navbar navbar-inverse navbar-static-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <IndexLink to="/" className="navbar-brand" >Spam Should Not Pass</IndexLink>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav navbar-left">
                                    <li><Link to="/signin">Products</Link></li>
                                    <li><Link to="/signin">Parteners</Link></li>
                                    <li><Link to="/signin">News</Link></li>
                                    <li><Link to="/signin">Blog</Link></li>
                                    <li><Link to="/signin">Company</Link></li>
                                </ul>
                                    { this.state.logged ?
                                        <ul className="nav navbar-nav navbar-right">
                                            <li><Link to="/admin">Admin</Link></li>
                                            <li><Link to="/logout">Log out</Link></li>
                                        </ul>:
                                        <ul className="nav navbar-nav navbar-right">
                                            <li><Link to="/signin">Sign in</Link></li>
                                            <li><Link to="/signup">Sign up</Link></li>
                                        </ul>
                                    }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
});

module.exports = Navbar;
