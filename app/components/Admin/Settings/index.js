import React from 'react';

var SettingsIndex = React.createClass({

    render: function() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        SettingsIndex
                    </h1>
                </section>

                <section className="content">
                    {this.props.children}
                </section>
            </div>
        )
    }
});

module.exports = SettingsIndex;
