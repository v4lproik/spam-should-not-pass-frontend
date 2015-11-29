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

var RuleDetail = React.createClass({

    getInitialState: function() {
        return {
            rules: [],
            context: {},
            rulesSelected: []
        };
    },

    componentDidMount: function() {
        var user = LoginStore.getUser();
        var contextId = this.props.params.contextId;

        ContextService.getContextAndRules(contextId, user.token)
            .then(function(data){
                console.log(data);
                this.setState({
                    context: data,
                    rules: data.rules
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    handleSubmitx: function(e) {
        e.preventDefault();
        var user = LoginStore.getUser();

        if(this.state.action === 'delete'){
            ContextService.delete(this.state.context.id, user.token)
                .then(function(){
                    notificationSuccess(null, 'The context has been deleted !');
                }.bind(this))
                .catch(function(err){
                    if(err instanceof PlatformException.constructor){
                        redirectionError(this.props.history, err.code);
                        notificationAlert(null, err.message);
                    }
                }.bind(this));

            return;
        }

        var type = this.refs.type.value.trim();
        var name = this.refs.name.value.trim();
        var rule = this.refs.context.value.trim();
        if (!type || !name || !rule) {
            return;
        }


        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        var newArray = {};
        newArray.type = type;
        newArray.context = rule;
        newArray.name = name;

        RuleService.add(newArray, user.token)
            .then(function(){

            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    setAction: function(action){
        this.setState({action : action});
    },

    handleChange: function(idRule) {
        var index = this.state.rulesSelected.indexOf(idRule);

        index > -1 ? this.state.rulesSelected.splice(index, 1) : this.state.rulesSelected.push(idRule);
    },

    render: function() {

        var rules = this.state.rules;
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
                    <input type="submit" value="Modify" className="btn btn-primary" ref="Modify" onClick={this.setAction.bind(this, 'modify')}/>&nbsp;&nbsp;
                    <input type="submit" value="Delete" className="btn btn-primary" ref="Delete" onClick={this.setAction.bind(this, 'delete')}/>
                    <Link to="/admin/context/list" type="submit" className="btn btn-danger pull-right">Cancel</Link>
                </div>
            </form>
        )
    }
});

module.exports = RuleDetail;
