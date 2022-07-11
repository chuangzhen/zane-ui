import React, { CSSProperties } from "react";
export interface IMenuItemProps {
    className?: string;
    /**用于比较index,显示高亮 */
    key?: string;
    style?: CSSProperties;
    disabled?: boolean;
}
declare const MenuItem: React.FC<IMenuItemProps>;
export default MenuItem;
