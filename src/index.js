import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './main/Calculator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <Calculator />
    </div>
, document.getElementById('root'));
registerServiceWorker();
