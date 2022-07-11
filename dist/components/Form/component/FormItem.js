var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useLayoutEffect, useReducer } from "react";
import { useFormContext } from './useFormItemsContext';
// import  '../_style.scss'
import classNames from "classnames";
var Item = function (props) {
    var _a, _b, _c;
    var children = props.children, name = props.name, _d = props.label, label = _d === void 0 ? '' : _d, _e = props.rules, rules = _e === void 0 ? {} : _e, rest = __rest(props
    //获取context中form的实例对象的方法
    , ["children", "name", "label", "rules"]);
    //获取context中form的实例对象的方法
    var _f = useFormContext(), getFieldValue = _f.getFieldValue, setFieldsValue = _f.setFieldsValue, registerItemInfos = _f.registerItemInfos;
    //定义 强制 Item 组件更新的方法，将这个更新方法透传给实例对象注册
    var _g = useReducer(function (x) { return x + 1; }, 0), _ = _g[0], forceUpdate = _g[1];
    console.log(111, getFieldValue(name));
    //页面渲染之前先注册对应的表单项的props和update函数，有name的注册
    useLayoutEffect(function () {
        if (!!name) {
            registerItemInfos({
                props: { name: name, rules: rules },
                onStoreChange: forceUpdate
            });
        }
    }, []);
    return React.createElement("div", { className: 'item_container' },
        React.createElement("div", { className: 'item_content' },
            React.createElement("span", { className: classNames('item_label', {
                    'item_hidden': !label,
                    'item_required': rules === null || rules === void 0 ? void 0 : rules.required,
                    'item_not_required': !(rules === null || rules === void 0 ? void 0 : rules.required)
                }) },
                label,
                ":"),
            React.createElement("div", { className: 'item_wrapper' },
                React.cloneElement(children, {
                    value: ((_a = getFieldValue(name)) === null || _a === void 0 ? void 0 : _a.value) || '',
                    onChange: function (e) {
                        var _a;
                        //给Item 包裹的子组件 Child 注入value和onChange 同时更新form实例对象的store
                        var newValue = e.target.value;
                        //实例对象中的store更新的时候，要触发Item更新注入给子组件 Child 的 value
                        setFieldsValue((_a = {},
                            _a[name] = newValue,
                            _a));
                    }
                }),
                React.createElement("div", { className: classNames('item_err', {
                        'item_hidden': !((_b = getFieldValue(name)) === null || _b === void 0 ? void 0 : _b.err)
                    }) }, ((_c = getFieldValue(name)) === null || _c === void 0 ? void 0 : _c.err) || ''))));
};
Item.displayName = 'formItem';
export default Item;
