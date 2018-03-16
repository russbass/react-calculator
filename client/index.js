import React from 'react'; //imports react
import ReactDOM from 'react-dom'; // imports ReactDom package
import './styles/main.css'; // Imports styles file.

// using the render method, we will mount this node into our DOM (http file) 
// on the element with an id of 'app'

ReactDOM.render(
    <div>Hello World</div>,
    document.getElementById('app')
);