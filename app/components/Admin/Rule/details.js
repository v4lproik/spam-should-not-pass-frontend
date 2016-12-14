import React from 'react';
import Link from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import RuleService from '../../../services/RuleService.js';
import {redirectionError, redirectionUnauthorised} from '../../Utility/redirection.js';
import {notificationAlert, notificationSuccess} from '../../Utility/notification.js';

var RuleDetail = React.createClass({

    getInitialState: function() {
        return {
            action: '',
            rule: {},
            ruleName: '',
            ruleRule: '',
            type: [{show: 'Document', value: 'DOCUMENT'}, {show: 'User', value: 'USER'}]
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        RuleService.get(this.props.params.ruleID, user.token)
            .then(function(rule){
                this.setState({
                    rule: rule,
                    ruleName: rule.name,
                    ruleRule: rule.rule
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
        var name = this.refs.ruleName.value.trim();
        var rule = this.refs.ruleRule.value.trim();
        if (!type || !name || !rule) {
            return;
        }


        if (typeof user === 'undefined') {
            redirectionUnauthorised(this.props.history);
        }

        var newArray = {};
        newArray.id = this.props.params.ruleID;
        newArray.type = type;
        newArray.rule = rule;
        newArray.name = name;

        RuleService.update(newArray, user.token)
            .then(function(){
                notificationSuccess(null, 'The rule has been updated !');
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

    handleChangeName: function(e){
        this.setState({ruleName : e.target.value});
    },

    handleChangeRule: function(e){
        this.setState({ruleRule : e.target.value});
    },

    render: function() {

        var name = this.state.ruleName;
        var rule = this.state.ruleRule;

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
                                    <input type="text" className="form-control" placeholder="Enter a name..." ref="ruleName" value={name} onChange={this.handleChangeName}/>
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <select className="form-control" ref="type">
                                        {this.state.type.map(function(value){
                                            if(this.state.rule.type == value.value){
                                                return (<option value={value.value} selected="selected">{value.show}</option>);
                                            }else{
                                                return (<option value={value.value}>{value.show}</option>);
                                            }
                                        }.bind(this))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Textarea</label>
                                    <textarea className="form-control" value={rule} ref="ruleRule" onChange={this.handleChangeRule}></textarea>
                                </div>
                            </div>
                            <div className="box-footer">
                                <input type="submit" value="Modify" className="btn btn-primary" ref="Modify" onClick={this.setAction.bind(this, 'modify')}/>&nbsp;&nbsp;
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
