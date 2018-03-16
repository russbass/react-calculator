import React from 'react'; //imports react
import ReactDOM from 'react-dom'; // imports ReactDom package
import Frame from './components/frame'; // imports the frame component
import './styles/main.css'; // Imports styles file.


// using the render method, we will mount this node into our DOM (http file) 
// on the element with an id of 'app'

ReactDOM.render(
    <Frame />, //mounts the Frame component
    document.getElementById('app')
);