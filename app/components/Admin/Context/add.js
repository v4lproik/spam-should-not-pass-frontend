import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import MemberInfoService from '../../../services/MemberService.js';
import SessionService from '../../../services/SessionService.js';
import RuleService from '../../../services/RuleService.js';
import ContextService from '../../../services/ContextService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../../Utility/redirection.js';
import {notificationAlert, notificationSuccess} from '../../Utility/notification.js';

var ContextAdd = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            rules: [],
            rulesSelected: []
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        console.log("call from /context_add");

        RuleService.list(user.token)
            .then(function(data){
                this.setState({
                    username: user.nickName,
                    rules: data
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    handleSubmitContext: function(e) {
        e.preventDefault();

        var name = this.refs.nameContext.value.trim();
        var rulesSelected = this.state.rulesSelected;
        var rules = [];

        if(this.state.rulesSelected.length == 0){
            notificationAlert('Error', 'You have to choose at least one rule');
            return;
        }

        for (var i = 0; i < rulesSelected.length; i++) {
           rules.push({id: rulesSelected[i]});
        }

        if (!name) {
            return;
        }

        var user = LoginStore.getUser();
        ContextService.add(name, user.token)
            .then(function(context){
                ContextService.addRules(context.id, rules, user.token)
                    .then(function(context){
                        notificationSuccess('Success', 'The context has been added !');
                    }.bind(this))
                    .catch(function(err){
                        if(err instanceof PlatformException.constructor){
                            redirectionError(this.props.history, err.code);
                            notificationAlert('Error', err.message);
                        }
                    }.bind(this));
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                    notificationAlert('Error', err.message);
                }
            }.bind(this));
    },

    handleClick: function(id) {
        this.props.history.pushState(null, '/admin/rule/detail/' + id);
    },

    handleChange: function(idRule) {
        var index = this.state.rulesSelected.indexOf(idRule);

        index > -1 ? this.state.rulesSelected.splice(index, 1) : this.state.rulesSelected.push(idRule);
    },

    render: function() {

        var rules = this.state.rules;

        return (
            <form role="form" onSubmit={this.handleSubmitContext}>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">New Context</h3>
                            </div>
                            <div className="box-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Enter a name..." ref="nameContext"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">User Rules</h3>
                            </div>
                            <div className="box-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th style={{width: '10px'}}>#</th>
                                        <th>Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rules.map(function(value){
                                        if(value.type === 'SPAMMER'){
                                            return(
                                                <tr><td><input type="checkbox" className="minimal" onChange={this.handleChange.bind(this, value.id)}/></td><td>{value.rule}</td></tr>
                                            )
                                        }
                                    }.bind(this))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="box box-primary">
                            <div className="box-header">
                                <h3 className="box-title">Document Rules</h3>
                            </div>
                            <div className="box-body">
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th style={{width: '10px'}}>#</th>
                                        <th>Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rules.map(function(value){
                                        if(value.type === 'SPAM'){
                                            return(
                                                <tr><td><input type="checkbox" className="minimal" onChange={this.handleChange.bind(this, value.id)}/></td><td>{value.rule}</td></tr>
                                            )
                                        }
                                    }.bind(this))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/admin/context/list" type="submit" className="btn btn-danger pull-right">Cancel</Link>
                </div>
            </form>
        )
    }
});

module.exports = ContextAdd;
