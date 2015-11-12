import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar/container.js';
import Carousel from './components/Carousel/container.js';
import Marketing from './components/Marketing/container.js';
import Featurette from './components/Featurette/container.js';

ReactDOM.render(
    <div>
        <Navbar />
        <Carousel />
        <Marketing />
        <Featurette />
    </div>
        ,
    document.getElementById('app')
);