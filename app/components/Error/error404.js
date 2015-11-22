import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';

//css
require('../../public/css/error.css');

var error404 = React.createClass({
    render: function() {
        return (
            <div id="error-container">
                <section className="error-content error-403 js-error-container">
                    <section className="error-details">
                        <section className="error-message">
                            <h1 className="error-code">404</h1>
                            <h2 className="error-description">Not found</h2>
                            <IndexLink to="/" className="error-link" >Go to the front page →</IndexLink>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = error404;
