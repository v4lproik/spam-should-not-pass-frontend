import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';
import LoginStore from '../../../stores/LoginStore.js';
import PlatformException from '../../../models/PlatformException.js';
import MemberInfoService from '../../../services/MemberService.js';
import SessionService from '../../../services/SessionService.js';
import RuleService from '../../../services/RuleService.js';
import {redirectionError, redirectionSessionExpired, redirectionUnauthorised} from '../../App/Utility/redirection.js';

var ApiIndex = React.createClass({

    render: function() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        Api
                    </h1>
                </section>

                <section className="content">
                    {this.props.children}
                </section>
            </div>
        )
    }
});

module.exports = ApiIndex;
