import React from 'react';
import {Link} from 'react-router';

var Unavailable = React.createClass({
    render: function() {
        return (
            <div className="error-container-redirection">
                <section className="error-content-redirection error-403 js-error-container-redirection">
                    <section className="error-details-redirection">
                        <section className="error-message-redirection">
                            <h1 className="error-code-redirection">KO</h1>
                            <h2 className="error-description-redirection">Unavailable! Please come back later.</h2>
                            <Link to="/signin" className="error-link-redirection">Refresh the page →</Link>
                        </section>
                    </section>
                </section>
            </div>
        )
    }
});

module.exports = Unavailable;
