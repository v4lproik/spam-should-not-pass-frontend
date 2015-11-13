import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/container.js';
import Carousel from '../Carousel/container.js';
import Marketing from '../Marketing/container.js';
import Featurette from '../Featurette/container.js';
import SignIn from '../SignIn/container.js';

require('../../public/css/bootstrap.min.css');
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
