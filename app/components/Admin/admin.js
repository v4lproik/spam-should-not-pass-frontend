import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../stores/LoginStore.js';
import PlatformException from '../../models/PlatformException.js';
import MemberInfoService from '../../services/MemberInformationService.js';
import {redirectionError} from '../App/utility.js';

var Admin = React.createClass({

    getInitialState: function() {
        return {
            username: ''
        };
    },

    componentDidMount: function() {
        var user = LoginStore.getUser();

        if (user === null) {
            this.props.history.pushState(null, '/error401');
        }

        console.log("Verify user info with " + user.token);

        MemberInfoService.info(user.token)
            .then(function(data){
                this.setState({
                    username: data.nickName
                });
            }.bind(this))
            .catch(function(err){
                if(err instanceof PlatformException.constructor){
                    redirectionError(this.props.history, err.status);
                }
            }.bind(this));
    },

    render: function() {
        return (
            <div>
                Hello {this.state.username}
                <Link to="/logout">logout</Link>
            </div>
        )
    }
});

module.exports = Admin;
