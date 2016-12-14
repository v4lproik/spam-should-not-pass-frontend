import React from 'react';
import {Link} from 'react-router';

//css
require('../../../public/css/error.css');

var SignOut = React.createClass({

    componentDidMount: function() {
        this.interval = setInterval(() => this.props.history.replaceState(null, '/'), 3000);
    },

    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    render: function() {
        return (
            <div id="error-container-redirection">
                <section className="error-content-redirection error-403 js-error-container-redirection">
                    <section className="error-details-redirection">
                        <section className="error-message-redirection">
                            <h1 className="error-code-redirection"></h1>
                            <h2 className="error-description-redirection">You have been logged out</h2>
                            <Link to="/" className="error-link-redirection">Redirection in 3 seconds or click here →</Link>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = SignOut;
