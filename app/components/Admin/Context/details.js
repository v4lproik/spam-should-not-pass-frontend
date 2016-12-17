import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import RuleService from '../../../services/RuleService.js';
import ContextService from '../../../services/ContextService.js';
import {redirectionError, redirectionUnauthorised} from '../../Utility/redirection.js';
import {notificationAlert, notificationSuccess} from '../../Utility/notification.js';

var RuleDetail = React.createClass({

    getInitialState: function() {
        return {rules: [], rulesAc: [], rulesAv: [], context: {}};
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();
        var contextId = this.props.params.contextId;

        ContextService.getContextAndRules(contextId, user.token).then(function(dataContext) {

            RuleService.list(user.token).then(function(dataRules) {

                var rulesAc = dataContext.rules;
                var rules = dataRules;
                var rulesAv = [];

                for (var i = 0; i < rules.length; i++) {
                    var flag = false;
                    for (var y = 0; y < rulesAc.length; y++) {
                        if (rules[i].id == rulesAc[y].id) {
                            flag = true;
                        }
                    }
                    if (!flag) {
                        rulesAv.push(rules[i]);
                    }
                }

                this.setState({context: dataContext, rules: rules, rulesAc: rulesAc, rulesAv: rulesAv});

            }.bind(this)).catch(function(err) {
                if (err instanceof PlatformException.constructor) {
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));

        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
                redirectionError(this.props.history, err.code);
            }
        }.bind(this));

    },

    handleSubmitx: function(e) {
        e.preventDefault();

        if (this.state.action === 'delete') {
            ContextService.delete(this.state.context.id, user.token).then(function() {
                notificationSuccess(null, 'The context has been deleted !');
            }.bind(this)).catch(function(err) {
                if (err instanceof PlatformException.constructor) {
                    redirectionError(this.props.history, err.code);
                    notificationAlert(null, err.message);
                }
            }.bind(this));

            return;
        }

        var context = this.state.context;
        var rulesAc = this.state.rulesAc;

        if (!context.name) {
            return;
        }

        var user = LoginStore.getUser();

        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        context.rules = rulesAc;
        ContextService.update(context, user.token).then(function() {
            notificationSuccess(null, 'The context has been updated !');
            this.setState({context: context});
        }.bind(this)).catch(function(err) {
            if (err instanceof PlatformException.constructor) {
                redirectionError(this.props.history, err.code);
            }
        }.bind(this));
    },

    setAction: function(action) {
        this.setState({action: action});
    },

    handleChange: function(idRule, action) {
        var rule;
        var rulesAv;

        if (action == 'toAct') {
            rule = this.state.rulesAv.filter((x) => {
                return x.id == idRule
            })[0];
            this.state.rulesAc.push(rule);

            rulesAv = this.state.rulesAv.filter((x) => {
                return x.id != idRule
            });
        } else {
            rule = this.state.rulesAc.filter((x) => {
                return x.id == idRule
            })[0];
            this.state.rulesAc.push(rule);

            rulesAv = this.state.rulesAv.filter((x) => {
                return x.id != idRule
            });
        }

        this.setState({rulesAc: this.state.rulesAc, rulesAv: rulesAv});
    },

    render: function() {

        var rulesAv = this.state.rulesAv;
        var rulesAc = this.state.rulesAc;
        var context = this.state.context;

        return (
            <form role="form" onSubmit={this.handleSubmitx}>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">New Context</h3>
                            </div>
                            <div className="box-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Enter a name..." ref="nameContext" value={context.name}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">Available Rules</h3>
                            </div>
                            <div className="box-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rulesAv.map(function(value) {
                                            return (
                                                <tr>
                                                    <td>{value.rule}</td>
                                                    <td>
                                                        <a class="pull-right" onClick={this.handleChange.bind(this, value.id, 'toAct')}>&gt;&gt;</a>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">Activated Rules</h3>
                            </div>
                            <div className="box-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rulesAc.map(function(value) {
                                            return (
                                                <tr>
                                                    <td>
                                                        <a class="pull-right" onClick={this.handleChange.bind(this, value.id, 'toAv')}>&lt;&lt;</a>
                                                    </td>
                                                    <td>
                                                        <span class="pull-right">{value.rule}</span>
                                                    </td>
                                                </tr>
                                            )
                                        }.bind(this))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-footer">
                    <input type="submit" value="Save" className="btn btn-primary" ref="Modify" onClick={this.setAction.bind(this, 'modify')}/>&nbsp;&nbsp;
                    <input type="submit" value="Delete" className="btn btn-primary" ref="Delete" onClick={this.setAction.bind(this, 'delete')}/>
                    <Link to="/admin/context/list" type="submit" className="btn btn-danger pull-right">Cancel</Link>
                </div>
            </form>
        )
    }
});

module.exports = RuleDetail;
