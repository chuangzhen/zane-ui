import React, { createContext, useState } from "react";
import classnames from "classnames";
/**context-用于透传参数 */
export var MenuContext = createContext({ mode: 'vertical', activeKey: '', });
var MenuIndex = function (props) {
    var _a = props.className, className = _a === void 0 ? "" : _a, mode = props.mode, style = props.style, _b = props.activeKey, activeKey = _b === void 0 ? '' : _b, _c = props.activeSubMenuKey, activeSubMenuKey = _c === void 0 ? [] : _c, children = props.children, onSelect = props.onSelect;
    /**当前活跃的下标-从0开始 */
    var _d = useState('a'), currentActiveKey = _d[0], setActiveKey = _d[1];
    var classes = classnames('zane-ui-menu', className, {
        'menu-vertical': mode === 'vertical'
    }, {
        'menu-horizontal': mode === 'horizontal'
    });
    //点击选中当前active的menu & 用户自定义onSelect操作
    var handleClick = function (key) {
        setActiveKey(key);
        onSelect && onSelect(key);
    };
    var passedContext = {
        mode: mode || 'vertical',
        activeKey: currentActiveKey || '',
        activeSubMenuKey: [],
        onSelect: handleClick
    };
    /**Menu组件升级
     * 1.内部非menuItem组件不展示处理
     * 2.MenuItem的index非必传，没传按顺序给默认值 ,使用组件时，index就可以不传了
     * */
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            console.log("🚀 ~ file: menu.tsx ~ line 67 ~ returnReact.Children.map ~ child", child);
            // child有很多其他的类型,ts没有提示displayName属性，使用ts的断言，将child断言为对应的React.FunctionComponentElement<IMenuItemProps> 组件类型，便可以获取到检测到语displayName属性
            var childElement = child;
            console.log('111--->', React.cloneElement(childElement));
            // React.FunctionComponentElement<IMenuItemProps> 属性有key props type ref  4个属性
            var _a = childElement.type.displayName, displayName = _a === void 0 ? '' : _a;
            if (['MenuItem', 'SubMenu'].includes(displayName)) {
                return React.cloneElement(childElement);
            }
            else {
                console.error('Warning:Menu has a child which is not a MenuItem Component!');
            }
        });
    };
    return (React.createElement("ul", { style: style || {}, className: classes, "data-testid": 'test-menu' },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
MenuIndex.defaultProps = {
    mode: 'vertical',
    activeKey: '',
};
export default MenuIndex;
