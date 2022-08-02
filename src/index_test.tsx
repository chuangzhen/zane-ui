import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/index.scss'
import Menu from './components/Menu'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
ReactDOM.render(
  <React.StrictMode>
    <div>
      <Menu activeKey='1-1' onSelect={(value) => { console.log(value) }}>

        <MenuItem value='1-1'>item1</MenuItem>
        <MenuItem value='1-2' disabled={true}>item2</MenuItem>
        <SubMenu value='1-3' title='subItem1-3'>
          <MenuItem value='1-3-1'>item1-3-1</MenuItem>
          <MenuItem value='1-3-2'>item1-3-2</MenuItem>
        </SubMenu>
      </Menu>


    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
