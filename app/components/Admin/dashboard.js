import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../stores/LoginStore.js';
import PlatformException from '../../models/PlatformException.js';
import MemberInfoService from '../../services/MemberService.js';
import SessionService from '../../services/SessionService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../App/utility.js';

var Dashboard = React.createClass({

    getInitialState: function() {
        return {
            username: ''
        };
    },

    componentWillMount: function() {
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
                LoginStore.setUser(data);
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
            <div>
                <section className="content">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-aqua"><i className="ion ion-ios-gear-outline"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">CPU Traffic</span>
                                    <span className="info-box-number">90<small>%</small></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-red"><i className="fa fa-google-plus"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Likes</span>
                                    <span className="info-box-number">41,410</span>
                                </div>
                            </div>
                        </div>


                        <div className="clearfix visible-sm-block"></div>

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-green"><i className="ion ion-ios-cart-outline"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">Sales</span>
                                    <span className="info-box-number">760</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-yellow"><i className="ion ion-ios-people-outline"></i></span>
                                <div className="info-box-content">
                                    <span className="info-box-text">New Members</span>
                                    <span className="info-box-number">2,000</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Monthly Recap Report</h3>
                                    <div className="box-tools pull-right">
                                        <button className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                                        <div className="btn-group">
                                            <button className="btn btn-box-tool dropdown-toggle" data-toggle="dropdown"><i className="fa fa-wrench"></i></button>
                                            <ul className="dropdown-menu" role="menu">
                                                <li><a href="#">Action</a></li>
                                                <li><a href="#">Another action</a></li>
                                                <li><a href="#">Something else here</a></li>
                                                <li className="divider"></li>
                                                <li><a href="#">Separated link</a></li>
                                            </ul>
                                        </div>
                                        <button className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="text-center">
                                                <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                                            </p>
                                            <div className="chart">

                                                <canvas id="salesChart"></canvas>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="text-center">
                                                <strong>Goal Completion</strong>
                                            </p>
                                            <div className="progress-group">
                                                <span className="progress-text">Add Products to Cart</span>
                                                <span className="progress-number"><b>160</b>/200</span>
                                                <div className="progress sm">
                                                    <div className="progress-bar progress-bar-aqua"></div>
                                                </div>
                                            </div>
                                            <div className="progress-group">
                                                <span className="progress-text">Complete Purchase</span>
                                                <span className="progress-number"><b>310</b>/400</span>
                                                <div className="progress sm">
                                                    <div className="progress-bar progress-bar-red"></div>
                                                </div>
                                            </div>
                                            <div className="progress-group">
                                                <span className="progress-text">Visit Premium Page</span>
                                                <span className="progress-number"><b>480</b>/800</span>
                                                <div className="progress sm">
                                                    <div className="progress-bar progress-bar-green"></div>
                                                </div>
                                            </div>
                                            <div className="progress-group">
                                                <span className="progress-text">Send Inquiries</span>
                                                <span className="progress-number"><b>250</b>/500</span>
                                                <div className="progress sm">
                                                    <div className="progress-bar progress-bar-yellow"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="row">
                                        <div className="col-sm-3 col-xs-6">
                                            <div className="description-block border-right">
                                                <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 17%</span>
                                                <h5 className="description-header">$35,210.43</h5>
                                                <span className="description-text">TOTAL REVENUE</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-xs-6">
                                            <div className="description-block border-right">
                                                <span className="description-percentage text-yellow"><i className="fa fa-caret-left"></i> 0%</span>
                                                <h5 className="description-header">$10,390.90</h5>
                                                <span className="description-text">TOTAL COST</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-xs-6">
                                            <div className="description-block border-right">
                                                <span className="description-percentage text-green"><i className="fa fa-caret-up"></i> 20%</span>
                                                <h5 className="description-header">$24,813.53</h5>
                                                <span className="description-text">TOTAL PROFIT</span>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-xs-6">
                                            <div className="description-block">
                                                <span className="description-percentage text-red"><i className="fa fa-caret-down"></i> 18%</span>
                                                <h5 className="description-header">1200</h5>
                                                <span className="description-text">GOAL COMPLETIONS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-md-8">

                            <div className="box box-success">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Visitors Report</h3>
                                    <div className="box-tools pull-right">
                                        <button className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                                        <button className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div className="box-body no-padding">
                                    <div className="row">
                                        <div className="col-md-9 col-sm-8">
                                            <div className="pad">

                                                <div id="world-map-markers" ></div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-4">
                                            <div className="pad box-pane-right bg-green">
                                                <div className="description-block margin-bottom">
                                                    <div className="sparkbar pad" data-color="#fff">90,70,90,70,75,80,70</div>
                                                    <h5 className="description-header">8390</h5>
                                                    <span className="description-text">Visits</span>
                                                </div>
                                                <div className="description-block margin-bottom">
                                                    <div className="sparkbar pad" data-color="#fff">90,50,90,70,61,83,63</div>
                                                    <h5 className="description-header">30%</h5>
                                                    <span className="description-text">Referrals</span>
                                                </div>
                                                <div className="description-block">
                                                    <div className="sparkbar pad" data-color="#fff">90,50,90,70,61,83,63</div>
                                                    <h5 className="description-header">70%</h5>
                                                    <span className="description-text">Organic</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
});

module.exports = Dashboard;
