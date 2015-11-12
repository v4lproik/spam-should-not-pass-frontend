import React from 'react';
import ReactDOM from 'react-dom';

var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <p className="pull-right"><a href="#">Back to top</a></p>
                <p>© 2014 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
            </footer>
        )
    }
});

module.exports = Footer;
