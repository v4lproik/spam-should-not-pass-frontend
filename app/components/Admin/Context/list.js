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

var RuleList = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            contexts: []
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        console.log("call from /context_list");

        ContextService.list(user.token)
            .then(function(data){
                this.setState({
                    username: user.nickName,
                    contexts: data
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));

    },

    handleClick: function(id) {
        this.props.history.pushState(null, '/admin/context/detail/' + id);
    },

    formatDate: function(unix_timestamp){
        var date = new Date(unix_timestamp);
        var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

        return formattedDate;
    },

    render: function() {

        var contexts = this.state.contexts;

        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <h3 className="box-title">List</h3>
                            <Link to="/admin/context/add" type="submit" className="btn btn-primary btn-sm place-right">+</Link>
                        </div>
                        <div className="box-body">
                            <form role="form" onSubmit={this.handleSubmitx}>

                                <table id="example2" className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Creation Date</th>
                                        <th>Last Update</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {contexts.map(function(value){
                                        return(
                                            <tr onClick={this.handleClick.bind(this, value.id)}><td>{value.name}</td><td>{this.formatDate(value.date.millis)}</td><td>{this.formatDate(value.lastUpdate.millis)}</td></tr>
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
