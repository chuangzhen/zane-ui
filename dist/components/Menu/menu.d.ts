import React, { CSSProperties } from "react";
declare type TMunemode = 'vertical' | 'horizontal';
declare type TSelectCallback = (selectKey: string) => void;
export interface IMenuProps {
    /**类名 */
    className?: string;
    /**默认的活跃item */
    activeKey?: string;
    /** vetical模式下才生效 */
    activeSubMenuKey?: string[];
    /**水平模式-vertical   垂直模式-horizontal, 默认vertical */
    mode?: TMunemode;
    /**行内样式 */
    style?: CSSProperties;
    /**全局选中方法 */
    onSelect?: TSelectCallback;
}
interface IMenuContext {
    mode: TMunemode;
    activeKey: string;
    activeSubMenuKey?: string[];
    onSelect?: TSelectCallback;
}
/**context-用于透传参数 */
export declare const MenuContext: React.Context<IMenuContext>;
declare const MenuIndex: React.FC<IMenuProps>;
export default MenuIndex;
