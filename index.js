import React from 'react';
import ReactDOM from 'react-dom';
import Example from './example';

// Cannot render to body anymore: react is throwing warnings.
// Adding new element instead.
const el = document.createElement('div');
document.body.appendChild(el);
ReactDOM.render(<Example />, el);