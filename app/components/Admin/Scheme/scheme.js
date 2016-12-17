import React from 'react';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import SchemeService from '../../../services/SchemeService.js';
import {redirectionError, redirectionUnauthorised} from '../../Utility/redirection.js';
import ArrayUtility from '../../Utility/array.js';

var Scheme = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            spamScheme: [],
            spammerScheme: [],
            spamSchemeToDisplay: [],
            spammerSchemeToDisplay: [],
            variableType: ["String", "Integer", "Boolean"]
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        SchemeService.getUser(user.id, user.token).then(function(schemeSpammer) {
            this.setState({
                spammerScheme: schemeSpammer,
                spammerSchemeToDisplay: ArrayUtility.sortByKey(schemeSpammer.properties, 'position')
            });
        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
                redirectionError(this.props.history, err.code);
            }
        }.bind(this));

        SchemeService.getDocument(user.id, user.token).then(function(schemeSpam) {
            this.setState({
                spamScheme: schemeSpam,
                spamSchemeToDisplay: ArrayUtility.sortByKey(schemeSpam.properties, 'position')
            });
        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
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
        properties = this.state.spamScheme.properties;

        var newArray = {};
        newArray.variableType = "java.lang." + variableType;
        newArray.variableName = variableName;
        newArray.locked = true;
        newArray.provided = false;
        newArray.position = properties.length + 1;

        properties.push(newArray);

        var user = LoginStore.getUser();

        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        SchemeService.addDocument(properties, user.token).then(function() {
            this.setState({spamSchemeToDisplay: properties});

        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
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
        properties = this.state.spammerScheme.properties;

        var newArray = {};
        newArray.variableType = "java.lang." + variableType;
        newArray.variableName = variableName;
        newArray.locked = true;
        newArray.provided = false;
        newArray.position = properties.length + 1;

        properties.push(newArray);

        var user = LoginStore.getUser();

        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        SchemeService.addUser(properties, user.token).then(function() {
            this.setState({spammerSchemeToDisplay: properties});

        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
                redirectionError(this.props.history, err.code);
            }
        }.bind(this));
    },

    render: function() {

        var schemeSpammer = this.state.spammerSchemeToDisplay;
        var schemeSpam = this.state.spamSchemeToDisplay;

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
                                                {schemeSpammer.map(function(value) {
                                                    return (
                                                        <tr>
                                                            <td>{value.variableType.split(".").pop()}</td>
                                                            <td>{value.variableName}</td>
                                                        </tr>
                                                    );
                                                })}
                                                <tr>

                                                    <td className="form-group">
                                                        <div className="form-group">
                                                            <select className="form-control" ref="variableType">
                                                                {this.state.variableType.map(function(value) {
                                                                    return (
                                                                        <option>{value}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input className="form-control" type="text" placeholder="Default input" ref="variableNameSpammer"/>
                                                    </td>
                                                    <td>
                                                        <input type="submit" className="btn btn-sm btn-primary btn-block" value="+"/>
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
                                                {schemeSpam.map(function(value) {
                                                    return (
                                                        <tr>
                                                            <td>{value.variableType.split(".").pop()}</td>
                                                            <td>{value.variableName}</td>
                                                        </tr>
                                                    );
                                                })}
                                                <tr>
                                                    <td>
                                                        <div className="form-group">
                                                            <select className="form-control" ref="variableType">
                                                                {this.state.variableType.map(function(value) {
                                                                    return (
                                                                        <option>{value}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <input className="form-control" type="text" placeholder="Default input" ref="variableNameSpam"/>
                                                        <input className="form-control" type="hidden" ref="variableScheme" value="spam"/>
                                                    </td>
                                                    <td>
                                                        <input type="submit" className="btn btn-sm btn-primary btn-block" value="+"/>
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
