import React from 'react';
import ReactDOM from 'react-dom';
import { Link, IndexLink } from 'react-router';

var Error404 = React.createClass({
    render: function() {
        return (
            <div className="error-container-redirection">
                <section className="error-content-redirection error-403 js-error-container-redirection">
                    <section className="error-details-redirection">
                        <section className="error-message-redirection">
                            <h1 className="error-code-redirection">404</h1>
                            <h2 className="error-description-redirection">Not found</h2>
                            <Link to="/signin" className="error-link-redirection" >Go to the front page →</Link>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = Error404;
