import {FC} from 'react'
import Menu,{IMenuProps} from "./menu";
import MenuItem ,{IMenuItemProps }from "./menuItem";
import SubMenu,{ISubMenuProps} from "./subMenu";

//定义组件类型
export type IMenuComponent = FC<IMenuProps> & {
  Item:FC<IMenuItemProps>
  SubMenu:FC<ISubMenuProps>
}

//给新的变量断言为新的组件类型，包含有MenuItem  SubMenu属性
const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu


export default TransMenu