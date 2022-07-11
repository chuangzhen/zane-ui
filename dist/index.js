import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/index.scss';
import Menu from './components/Menu';
import MenuItem from './components/Menu/menuItem';
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement("div", null,
        React.createElement(Menu, { activeKey: '1' },
            React.createElement(MenuItem, { key: '1' }, "1231231")))), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
