import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../stores/LoginStore.js';
import PlatformException from '../../models/PlatformException.js';
import MemberInfoService from '../../services/MemberService.js';
import SchemeService from '../../services/SchemeService.js';
import SessionService from '../../services/SessionService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../App/utility.js';

var Scheme = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            spamScheme: {},
            spammerScheme: {}
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        if (user === null) {
            redirectionUnauthorised(this.props.history);
        }

        console.log(user);

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

        SchemeService.schemeSpam(user.id, user.token)
            .then(function(scheme){
                this.setState({
                    spamScheme: scheme
                });

            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));

        SchemeService.schemeSpammer(user.id, user.token)
            .then(function(scheme){
                this.setState({
                    spammerScheme: scheme
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
                <section className="content-header">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">User Spammer Model</h3>
                                </div>
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Name</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>String</td>
                                            <td>id</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Document Spam Model</h3>
                                </div>
                                <div className="box-body">
                                    <table id="example2" className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>Rendering engine</th>
                                            <th>Browser</th>
                                            <th>Platform(s)</th>
                                            <th>Engine version</th>
                                            <th>CSS grade</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 4.0</td>
                                            <td>Win 95+</td>
                                            <td> 4</td>
                                            <td>X</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 5.0</td>
                                            <td>Win 95+</td>
                                            <td>5</td>
                                            <td>C</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 5.5</td>
                                            <td>Win 95+</td>
                                            <td>5.5</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet
                                                Explorer 6</td>
                                            <td>Win 98+</td>
                                            <td>6</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>Internet Explorer 7</td>
                                            <td>Win XP SP2+</td>
                                            <td>7</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Trident</td>
                                            <td>AOL browser (AOL desktop)</td>
                                            <td>Win XP</td>
                                            <td>6</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Gecko</td>
                                            <td>Firefox 1.0</td>
                                            <td>Win 98+ / OSX.2+</td>
                                            <td>1.7</td>
                                            <td>A</td>
                                        </tr>
                                        <tr>
                                            <td>Other browsers</td>
                                            <td>All others</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>U</td>
                                        </tr>
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>Rendering engine</th>
                                            <th>Browser</th>
                                            <th>Platform(s)</th>
                                            <th>Engine version</th>
                                            <th>CSS grade</th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
});

module.exports = Scheme;
