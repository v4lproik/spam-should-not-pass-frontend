import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';

//css
require('../../public/css/error.css');

var error401 = React.createClass({
    render: function() {
        return (
            <div id="error-container">
                <section className="error-content error-403 js-error-container">
                    <section className="error-details">
                        <section className="error-message">
                            <h1 className="error-code">KO</h1>
                            <h2 className="error-description">Unavailable</h2>
                            <Link to="/signin" className="error-link" >Refresh the page →</Link>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = error401;