var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classnames from "classnames";
// import './_style.scss'
import { MenuContext } from "./menu";
var SubMenu = function (props) {
    var _a;
    var _b = props.title, title = _b === void 0 ? '' : _b, _c = props.className, className = _c === void 0 ? "" : _c, key = props.key, style = props.style, disabled = props.disabled, children = props.children;
    var context = useContext(MenuContext);
    var isOpen = context.mode === 'vertical' && ((_a = context.activeSubMenuKey) === null || _a === void 0 ? void 0 : _a.includes(key));
    var _d = useState(isOpen), subMenuOpen = _d[0], setSubMenuOpen = _d[1];
    var classes = classnames('menu-item submenu-item', className, {
        'is-disabled': disabled,
        'is-opened': subMenuOpen,
        'is-active': context.activeKey === key,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setSubMenuOpen(!subMenuOpen);
    };
    var timer;
    var handleMouse = function (e, triggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setSubMenuOpen(triggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var submenuClasses = classnames('zane-submenu', {
            'menu-opened': subMenuOpen
        });
        var childComponents = React.Children.map(children, function (child, idx) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement);
            }
            else {
                console.log('Warning:submenu has a child which is not a MenuItem Component!');
            }
        });
        return React.createElement("ul", { className: submenuClasses }, childComponents);
    };
    return (React.createElement("li", __assign({ className: classes, style: style || {} }, hoverEvents, { key: key }),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement("span", { className: "arrow-icon" }, '>')),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
