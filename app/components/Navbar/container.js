import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';


var Navbar = React.createClass({
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
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/signin">Sign in</Link></li>
                                    <li><Link to="/signin">Sign up</Link></li>
                                    <li><Link to="/logout">Log out</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
});

module.exports = Navbar;
