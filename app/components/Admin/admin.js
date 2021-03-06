import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../stores/LoginStore.js';
import PlatformException from '../../models/PlatformException.js';
import MemberInfoService from '../../services/MemberService.js';
import SessionService from '../../services/SessionService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../Utility/redirection.js';

require('../../../node_modules/admin-lte/dist/css/AdminLTE.css');
require('../../public/css/admin.css');
require('../../../node_modules/admin-lte/dist/css/skins/_all-skins.min.css');
require('../../../node_modules/admin-lte/dist/js/app.min');
require('../../../node_modules/bootstrap-notify/');

var Admin = React.createClass({

    getInitialState: function() {
        return {
            username: ''
        };
    },

    getCurrentUrl: function(){
        return window.location.pathname + window.location.search;
    },

    componentDidMount: function() {
        console.log("call from /admin");
    },

    getCSSClass: function(category){
        var url = this.getCurrentUrl();

        if(category === ''){
            if(url === '/admin' || url === '/admin/'){
                return 'active bottom-line';
            }
            return 'bottom-line';
        }

        return url.indexOf(category) > -1 ? 'active bottom-line' : 'bottom-line';
    },

    render: function() {
        return (
            <div className="wrapper">
                <aside className="main-sidebar">
                    <section className="sidebar">

                        <ul className="sidebar-menu">
                            <li className="header">HOME</li>
                        </ul>

                        <form action="#" method="get" className="sidebar-form">
                            <div className="input-group">
                                <input type="text" name="q" className="form-control" placeholder="Search..." />
                                <span className="input-group-btn">
                                    <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i></button>
                                </span>
                            </div>
                        </form>
                        <ul className="sidebar-menu">

                            <li className="header">MAIN</li>
                            <li className={this.getCSSClass('')}><Link to="/admin"><i className="fa fa-link"></i> <span>Dashboard</span></Link></li>
                            <li className={this.getCSSClass('scheme')}><Link to="/admin/scheme"><i className="fa fa-link"></i> <span>Scheme</span></Link></li>
                            <li className={this.getCSSClass('rule')}><Link to="/admin/rule/list"><i className="fa fa-link"></i> <span>Rule</span></Link></li>
                            <li className={this.getCSSClass('context')}><Link to="/admin/context/list"><i className="fa fa-link"></i> <span>Context</span></Link></li>
                            <li className={this.getCSSClass('api')}><Link to="/admin/api"><i className="fa fa-link"></i> <span>API</span></Link></li>
                            <li className="header">USER</li>
                            <li className={this.getCSSClass('profile')}><Link to="/admin/profile"><i className="fa fa-link"></i> <span>Profile</span></Link></li>
                            <li className={this.getCSSClass('settings')}><Link to="/admin/settings"><i className="fa fa-link"></i> <span>Settings</span></Link></li>
                            <li className="bottom-line"><Link to="/logout"><i className="fa fa-link"></i> <span>Logout</span></Link></li>
                            <li className="header">HELP</li>
                            <li className={this.getCSSClass('faq')}><Link to="/admin/faq"><i className="fa fa-link"></i> <span>FAQ</span></Link></li>
                            <li className={this.getCSSClass('documentation')}><Link to="/admin/documentation"><i className="fa fa-link"></i> <span>Documentation</span></Link></li>
                        </ul>
                        <ul className="sidebar-menu" id="bars">
                            <li><Link to="/"><i className="fa fa-link"></i> <span>Main Website</span></Link></li>
                        </ul>
                    </section>
                </aside>

                <div className="content-wrapper">
                    {this.props.children}
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
