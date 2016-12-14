import React from 'react';

var ApiIndex = React.createClass({

    render: function() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        Api
                    </h1>
                </section>

                <section className="content">
                    {this.props.children}
                </section>
            </div>
        )
    }
});

module.exports = ApiIndex;
