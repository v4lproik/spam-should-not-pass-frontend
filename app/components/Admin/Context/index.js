import React from 'react';

var Rule = React.createClass({

    render: function() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        Contexts
                    </h1>
                </section>

                <section className="content">
                    {this.props.children}
                </section>
            </div>
        )
    }
});

module.exports = Rule;
