import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MyProvider from './context/MyProvider';

ReactDOM.render(<MyProvider><App /></MyProvider>, document.getElementById('root'));
