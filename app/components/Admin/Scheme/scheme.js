import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import MemberInfoService from '../../../services/MemberService.js';
import SchemeService from '../../../services/SchemeService.js';
import SessionService from '../../../services/SessionService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../../Utility/redirection.js';

var Scheme = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            spamScheme: [],
            spammerScheme: [],
            variableType: ["java.lang.String", "java.lang.Integer", "java.lang.Boolean"]
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        console.log("call from /scheme");

        MemberInfoService.info(user.token)
            .then(function(data){
                LoginStore.setUser(data);

                SchemeService.schemeSpammer(user.id, user.token)
                    .then(function(schemeSpammer){

                        SchemeService.schemeSpam(user.id, user.token)
                            .then(function(schemeSpam){
                                this.setState({
                                    username: data.nickName,
                                    spammerScheme: schemeSpammer,
                                    spamScheme: schemeSpam
                                });

                            }.bind(this))
                            .catch(function(err){
                                if(err instanceof PlatformException.constructor){
                                    redirectionError(this.props.history, err.code);
                                }
                            }.bind(this));

                        return scheme;
                    }.bind(this))
                    .catch(function(err){
                        if(err instanceof PlatformException.constructor){
                            redirectionError(this.props.history, err.code);
                        }
                    }.bind(this));


            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    handleSubmitSpam: function(e) {
        e.preventDefault();
        var variableType = this.refs.variableType.value.trim();
        var variableName = this.refs.variableNameSpam.value.trim();

        if (!variableType || !variableName) {
            return;
        }


        var properties = [];
        properties = $.parseJSON(this.state.spamScheme.properties);

        var newArray = {};
        newArray.variableType = variableType;
        newArray.variableName = variableName;

        properties.push(newArray);

        var user = LoginStore.getUser();

        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        SchemeService.addSchemeSpam(properties, user.token);

        SchemeService.schemeSpammer(user.id, user.token)
            .then(function(schemeSpammer){

                SchemeService.schemeSpam(user.id, user.token)
                    .then(function(schemeSpam){
                        this.setState({
                            spammerScheme: schemeSpammer,
                            spamScheme: schemeSpam
                        });

                    }.bind(this))
                    .catch(function(err){
                        if(err instanceof PlatformException.constructor){
                            redirectionError(this.props.history, err.code);
                        }
                    }.bind(this));

            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    handleSubmitSpammer: function(e) {
        e.preventDefault();
        var variableType = this.refs.variableType.value.trim();
        var variableName = this.refs.variableNameSpammer.value.trim();

        if (!variableType || !variableName) {
            return;
        }

        var properties = [];
        properties = $.parseJSON(this.state.spammerScheme.properties);

        var newArray = {};
        newArray.variableType = variableType;
        newArray.variableName = variableName;

        properties.push(newArray);

        var user = LoginStore.getUser();

        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        SchemeService.addSchemeSpammer(properties, user.token);


        SchemeService.schemeSpammer(user.id, user.token)
            .then(function(schemeSpammer){

                SchemeService.schemeSpam(user.id, user.token)
                    .then(function(schemeSpam){
                        this.setState({
                            spammerScheme: schemeSpammer,
                            spamScheme: schemeSpam
                        });

                    }.bind(this))
                    .catch(function(err){
                        if(err instanceof PlatformException.constructor){
                            redirectionError(this.props.history, err.code);
                        }
                    }.bind(this));

            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    render: function() {

        var schemeSpammer = [];
        var schemeSpam = [];
        var tableRowSpammer = this.state.spammerScheme.properties;
        var tableRowSpam = this.state.spamScheme.properties;

        if (typeof tableRowSpam !== 'undefined' && typeof tableRowSpammer !== 'undefined') {
            schemeSpammer = JSON.parse(tableRowSpammer);
            schemeSpam = JSON.parse(tableRowSpam);
        }

        return (
            <div>
                <section className="content-header">
                    <h1>
                        Schemes
                    </h1>
                </section>

                <section className="content-header">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">User Model</h3>
                                </div>
                                <div className="box-body">
                                    <form role="form" onSubmit={this.handleSubmitSpammer}>

                                        <table className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Name</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {schemeSpammer.map(function(value){
                                                return (<tr><td>{value.variableType}</td><td>{value.variableName}</td></tr>);
                                            })}
                                            <tr>

                                                <td className="form-group">
                                                    <div className="form-group">
                                                        <select className="form-control" ref="variableType">
                                                            {this.state.variableType.map(function(value){
                                                                return (<option>{value}</option>);
                                                            })}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" placeholder="Default input" ref="variableNameSpammer" />
                                                </td>
                                                <td>
                                                    <input type="submit" className="btn btn-sm btn-primary btn-block" value="+" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="box box-primary">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Document Model</h3>
                                </div>
                                <div className="box-body">
                                    <form role="form" onSubmit={this.handleSubmitSpam}>

                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Name</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {schemeSpam.map(function(value){
                                                return (<tr><td>{value.variableType}</td><td>{value.variableName}</td></tr>);
                                            })}
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <select className="form-control" ref="variableType">
                                                            {this.state.variableType.map(function(value){
                                                                return (<option>{value}</option>);
                                                            })}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <input className="form-control" type="text" placeholder="Default input" ref="variableNameSpam" />
                                                    <input className="form-control" type="hidden" ref="variableScheme" value="spam"/>
                                                </td>
                                                <td>
                                                    <input type="submit" className="btn btn-sm btn-primary btn-block" value="+" />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </form>
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
