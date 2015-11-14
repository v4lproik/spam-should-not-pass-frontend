import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';

//css
require('../../public/css/error.css');

var error403 = React.createClass({
    render: function() {
        return (
            <div id="error-container">
                <section className="error-content error-403 js-error-container">
                    <section className="error-details">
                        <section className="error-message">
                            <h1 className="error-code">403</h1>
                            <h2 className="error-description">Forbidden</h2>
                            <IndexLink to="/" className="error-link" >Go to the front page →</IndexLink>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = error403;
