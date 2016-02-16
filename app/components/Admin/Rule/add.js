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

var RuleDetail = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            context: {},
            type: [{show: 'Document', value: 'DOCUMENT'}, {show: 'User', value: 'USER'}],
            success: ''
        };
    },

    handleSubmitx: function(e) {
        e.preventDefault();

        var type = this.refs.type.value.trim();
        console.log(type);
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
                notificationSuccess('Success', 'The rule has been added !');
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                    notificationAlert('Error', err);
                }
            }.bind(this));
    },

    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Rule details</h3>
                        </div>
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
                                            return (<option value={value.value}>{value.show}</option>);
                                        }.bind(this))}
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
