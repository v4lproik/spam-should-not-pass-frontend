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
            spamScheme: [],
            spammerScheme: [],
            variableType: ["java.lang.String", "java.lang.Integer", "java.lang.Boolean"]
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        if (typeof user === 'undefined') {
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

    handleSubmitx: function(e) {
        e.preventDefault();
        console.log("BIP");
        var variableType = this.refs.variableType.value.trim();
        var variableName = this.refs.variableName.value.trim();
        var variableScheme = this.refs.variableScheme.value.trim();

        if (!variableName || !variableType || !variableScheme) {
            return;
        }

        if(variableScheme === 'spammer'){
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

        }else{
            if(variableScheme === 'spam'){
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
            }
        }

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
            <section className="content-header">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">User Spammer Model</h3>
                            </div>
                            <div className="box-body">
                                <form role="form" onSubmit={this.handleSubmitx}>

                                    <table id="example2" className="table table-bordered table-hover">
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
                                                <input className="form-control" type="text" placeholder="Default input" ref="variableName" />
                                                <input className="form-control" type="hidden" placeholder="Default input"  ref="variableScheme" value="spammer"/>
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
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Document Spam Model</h3>
                            </div>
                            <div className="box-body">
                                <form role="form" onSubmit={this.handleSubmitx}>

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
                                                <input className="form-control" type="text" placeholder="Default input" ref="variableName" />
                                                <input className="form-control" type="hidden" placeholder="Default input"  ref="variableScheme" value="spam"/>
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
        )
    }
});

module.exports = Scheme;
