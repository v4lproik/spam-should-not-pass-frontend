import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';

//css
require('../../public/css/error.css');

var session = React.createClass({
    render: function() {
        return (
            <div id="error-container">
                <section className="error-content error-403 js-error-container">
                    <section className="error-details">
                        <section className="error-message">
                            <h1 className="error-code">401</h1>
                            <h2 className="error-description">Session Expired</h2>
                            <Link to="/signin" className="error-link" >Go to the signin page →</Link>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = session;
