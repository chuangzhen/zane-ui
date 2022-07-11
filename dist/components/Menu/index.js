import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
//给新的变量断言为新的组件类型，包含有MenuItem  SubMenu属性
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
