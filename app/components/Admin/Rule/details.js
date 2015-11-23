import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import MemberInfoService from '../../../services/MemberService.js';
import SessionService from '../../../services/SessionService.js';
import RuleService from '../../../services/RuleService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../../App/Utility/redirection.js';
import {notificationAlert, notificationSuccess} from '../../App/Utility/notification.js';

var RuleDetail = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            action: '',
            rule: {},
            type: [{show: 'Document', value: 'SPAM'}, {show: 'User', value: 'SPAMMER'}],
            success: ''
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        RuleService.get(this.props.params.ruleID, user.token)
            .then(function(rule){
                this.setState({
                    rule: rule
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    if(err.error === 'INVALID_INPUT'){
                        redirectionError(this.props.history, 404);
                    }
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    handleSubmitx: function(e) {
        e.preventDefault();
        var user = LoginStore.getUser();

        if(this.state.action === 'delete'){
            RuleService.delete(this.state.rule.id, user.token)
                .then(function(){
                    notificationSuccess(null, 'The rule has been deleted !');
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
        var rule = this.refs.rule.value.trim();
        if (!type || !name || !rule) {
            return;
        }


        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        var newArray = {};
        newArray.type = type;
        newArray.rule = rule;
        newArray.name = name;

        RuleService.add(newArray, user.token)
            .then(function(){
                this.setState({
                    success: 'The rule has been added !'
                });
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

    render: function() {

        var rules = this.state.rules;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Details</h3>
                        </div>
                        <form role="form" onSubmit={this.handleSubmitx}>
                            <div className="box-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Enter a name..." ref="name" value={this.state.rule.name}/>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select className="form-control" ref="type">
                                        {this.state.type.map(function(value){
                                            if(this.state.rule.type == value.value){
                                                return (<option value="{value.value}" selected="selected">{value.show}</option>);
                                            }else{
                                                return (<option value="{value.value}">{value.show}</option>);
                                            }
                                        }.bind(this))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <pre className="prettyprint" ref="rule">{this.state.rule.rule}</pre>
                                </div>
                            </div>
                            <div className="box-footer">
                                <input type="submit" value="Modify" className="btn btn-primary" ref="Modify" data-name="modify" onClick={this.setAction.bind(this, 'modify')}/>&nbsp;&nbsp;
                                <input type="submit" value="Delete" className="btn btn-primary" ref="Delete" onClick={this.setAction.bind(this, 'delete')}/>
                                <Link to="/admin/rule/list" type="submit" className="btn btn-danger pull-right">Cancel</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
});

module.exports = RuleDetail;
