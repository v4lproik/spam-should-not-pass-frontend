import React from 'react';

var ProfileIndex = React.createClass({

    render: function() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        Profile
                    </h1>
                </section>

                <section className="content">
                    {this.props.children}
                </section>
            </div>
        )
    }
});

module.exports = ProfileIndex;
