import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import MemberInfoService from '../../../services/MemberService.js';
import SessionService from '../../../services/SessionService.js';
import RuleService from '../../../services/RuleService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../../App/utility.js';

var RuleDetail = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            rule: {},
            type: ['SPAM', 'SPAMMER'],
            success: ''
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        console.log("call from /rule_details");

            if(this.state.rule){
                //redirectionError(this.props.history, 404);
            }


    },

    handleSubmitx: function(e) {
        e.preventDefault();

        var type = this.refs.type.value.trim();
        var name = this.refs.name.value.trim();
        var rule = this.refs.rule.value.trim();
        if (!type || !name || !rule) {
            return;
        }

        var user = LoginStore.getUser();

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

    isError: function(){
        if(this.state.error){
            return(<div className="alert alert-danger fade in">
                <center>{this.state.error}</center>
            </div>);
        }
    },

    isSuccess: function(){
        if(this.state.success){
            return(<div className="success alert-success fade in">
                <center>{this.state.success}</center>
            </div>);
        }
    },

    render: function() {

        var rules = this.state.rules;

        return (
            <div className="row">
                <div className="col-xs-12">

                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Rule details</h3>
                    </div>
                    {this.isError()}
                    {this.isSuccess()}
                    <form role="form" onSubmit={this.handleSubmitx}>
                        <div className="box-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Enter a name..." ref="name"/>
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select className="form-control" ref="type">
                                    {this.state.type.map(function(value){
                                        return (<option>{value}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" rows="5" ref="rule"></textarea>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
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
