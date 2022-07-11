import React, { useContext } from "react";
import classnames from "classnames";
// import './_style.scss'
import { MenuContext } from "./menu";
var MenuItem = function (props) {
    var _a = props.className, className = _a === void 0 ? "" : _a, key = props.key, style = props.style, disabled = props.disabled, children = props.children;
    var context = useContext(MenuContext);
    var classes = classnames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.activeKey === key
    });
    console.log(context, "🚀 ~ file: menuItem.tsx ~ line 18 ~ props", props);
    var handleClick = function () {
        if ((context === null || context === void 0 ? void 0 : context.onSelect) && !disabled && (typeof key === 'string')) {
            context.onSelect(key);
        }
    };
    return (React.createElement("li", { className: classes, style: style || {}, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
