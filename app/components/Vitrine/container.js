import React from 'react';
import Navbar from './Navbar/container.js';
import Carousel from './Carousel/container.js';
import Marketing from './Marketing/container.js';
import Featurette from './Featurette/container.js';

require('../../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../../public/css/error.css');
require('../../public/css/carousel.css');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar />
                <Carousel />
                <Marketing />
                <Featurette />
            </div>
        )
    }
});

module.exports = App;
