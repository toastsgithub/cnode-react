import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homepage from './container/Homepage.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Homepage />, document.getElementById('root'));
registerServiceWorker();
