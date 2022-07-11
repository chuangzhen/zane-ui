import React, { CSSProperties } from "react";
export interface ISubMenuProps {
    title: string;
    /**用于比较index,显示高亮 */
    key: string;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
}
declare const SubMenu: React.FC<ISubMenuProps>;
export default SubMenu;
