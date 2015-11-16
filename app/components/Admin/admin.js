import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../stores/LoginStore.js';
import PlatformException from '../../models/PlatformException.js';
import MemberInfoService from '../../services/MemberService.js';
import SessionService from '../../services/SessionService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../App/utility.js';

require('../../../node_modules/admin-lte/dist/css/AdminLTE.min.css');
require('../../../node_modules/admin-lte/dist/js/app.min.js');
require('../../../node_modules/admin-lte/dist/css/skins/_all-skins.min.css');

var Admin = React.createClass({

    getInitialState: function() {
        return {
            username: ''
        };
    },

    componentDidMount: function() {
        var user = LoginStore.getUser();

        if (user === null) {
            redirectionUnauthorised(this.props.history);
        }

        if (!SessionService.isValid(user.lastUpdate)){
            LoginStore.clearUser();
            redirectionSessionExpired(this.props.history);
        }

        MemberInfoService.info(user.token)
            .then(function(data){
                this.setState({
                    username: data.nickName
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    render: function() {
        return (
            <div className="wrapper">
                <aside className="main-sidebar">
                    <section className="sidebar">
                        <div className="user-panel">
                            <div className="pull-left image">
                                <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                            </div>
                            <div className="pull-left info">
                                <p>Corporation Name</p>
                            </div>
                        </div>

                        <form action="#" method="get" className="sidebar-form">
                            <div className="input-group">
                                <input type="text" name="q" className="form-control" placeholder="Search..." />
                                <span className="input-group-btn">
                                    <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i></button>
                                </span>
                            </div>
                        </form>

                        <ul className="sidebar-menu">
                            <li className="treeview">
                                <a href="#"><i className="fa fa-link"></i> <span>Scheme</span> <i className="fa fa-angle-left pull-right"></i></a>
                                <ul className="treeview-menu">
                                    <li><a href="#">Add a new scheme</a></li>
                                    <li><a href="#">See your schemes</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="#"><i className="fa fa-link"></i> <span>Rule</span> <i className="fa fa-angle-left pull-right"></i></a>
                                <ul className="treeview-menu">
                                    <li><a href="#">Add a new rule</a></li>
                                    <li><a href="#">See your rules</a></li>
                                </ul>
                            </li>
                            <li className="treeview">
                                <a href="#"><i className="fa fa-link"></i> <span>Statistics</span> <i className="fa fa-angle-left pull-right"></i></a>
                                <ul className="treeview-menu">
                                    <li><a href="#">Spammer</a></li>
                                    <li><a href="#">Spam</a></li>
                                </ul>
                            </li>
                        </ul>
                    </section>
                </aside>

                <div className="content-wrapper">
                    <section className="content-header">
                        <h1>
                            Page Header
                            <small>Optional description</small>
                        </h1>
                    </section>

                    <section className="content">


                    </section>
                </div>

                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        Administration Panel
                    </div>
                    <strong>Copyright &copy; 2015 - <a href="#">Spam should not pass</a></strong> - All rights reserved.
                </footer>
                <div className="control-sidebar-bg"></div>
            </div>
        )
    }
});

module.exports = Admin;
