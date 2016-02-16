import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import MemberInfoService from '../../../services/MemberService.js';
import SessionService from '../../../services/SessionService.js';
import RuleService from '../../../services/RuleService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../../Utility/redirection.js';
import {notificationAlert, notificationSuccess} from '../../Utility/notification.js';

var RuleList = React.createClass({

    getInitialState: function() {
        return {
            rules: []
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        console.log("call from /rule_list");

        RuleService.list(user.token)
            .then(function(data){
                this.setState({
                    rules: data
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));

    },

    handleClick: function(id) {
        this.props.history.pushState(null, '/admin/rule/detail/' + id);
    },

    render: function() {

        var rules = this.state.rules;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <h3 className="box-title">User Rules</h3>
                            <Link to="/admin/rule/add" type="submit" className="btn btn-primary btn-sm place-right">+</Link>
                        </div>
                        <div className="box-body">
                            <form role="form" onSubmit={this.handleSubmitx}>
                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rules.map(function(value){
                                        return(
                                            <tr onClick={this.handleClick.bind(this, value.id)}><td>{value.name}</td><td>{value.rule}</td></tr>
                                        )
                                    }.bind(this))}
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = RuleList;
