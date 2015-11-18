import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../stores/LoginStore.js';
import PlatformException from '../../models/PlatformException.js';
import MemberInfoService from '../../services/MemberService.js';
import SessionService from '../../services/SessionService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../App/utility.js';

var Rule = React.createClass({

    getInitialState: function() {
        return {
            username: ''
        };
    },

    componentWillMount: function() {
        var user = LoginStore.getUser();

        if (user === null) {
            redirectionUnauthorised(this.props.history);
        }

        if (!SessionService.isValid(user.lastUpdate)){
            LoginStore.clearUser();
            redirectionSessionExpired(this.props.history);
        }

        MemberInfoService.info(user.token)
            .then(function(data){
                LoginStore.setUser(data);
                this.setState({
                    username: data.nickName
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.code);
                }
            }.bind(this));
    },

    render: function() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        Rule
                        <small>Add a new rule</small>
                    </h1>
                </section>

                <section className="content">
                    Add a new rule. Here we go !!
                </section>
            </div>
        )
    }
});

module.exports = Rule;
