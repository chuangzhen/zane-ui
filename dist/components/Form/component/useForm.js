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
import { useRef } from "react";
var FormStore = /** @class */ (function () {
    function FormStore() {
        var _this = this;
        /**获取全部表单数据 */
        this.getFieldsValue = function () {
            return _this.store;
        };
        /**获取单个表单项数据 */
        this.getFieldValue = function (name) {
            var fieldValueObj = {
                value: _this.store[name] || undefined
            };
            if (!!_this.errorStore[name]) {
                fieldValueObj['err'] = _this.errorStore[name];
            }
            return fieldValueObj;
        };
        /**设置（更新）表单域的值 */
        this.setFieldsValue = function (newStore) {
            //更新store
            _this.store = __assign(__assign({}, _this.store), newStore);
            //通知更新了的name-对应的组件触发更新渲染
            var keys = Object.keys(newStore);
            keys.forEach(function (key) {
                var _a;
                var err = _this.validate(false, key);
                if (err.length === 1) {
                    _this.errorStore = __assign(__assign({}, _this.errorStore), (_a = {}, _a[key] = err[0][key], _a));
                }
                else {
                    delete _this.errorStore[key];
                }
            });
            _this.itemsInfo.forEach(function (item, index) {
                if (keys.includes(item.props.name)) {
                    item.onStoreChange();
                }
            });
        };
        /**接收Form组件的onFinish onFinishFailed函数，表单提交时，，实例对象触发该props的函数 */
        this.setCallback = function (cbs) {
            _this.callbcaks = __assign(__assign({}, _this.callbcaks), cbs);
        };
        /**注册、取消注册Item组件实例的相关更新方法和属性 */
        this.registerItemInfos = function (itemInfo) {
            var _a, _b;
            //注册该表单项的信息
            _this.itemsInfo.push(itemInfo);
            ((_a = itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.props) === null || _a === void 0 ? void 0 : _a.name) && (_this.store[(_b = itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.props) === null || _b === void 0 ? void 0 : _b.name] = undefined);
            return function () {
                _this.itemsInfo = _this.itemsInfo.filter(function (i) { return i !== itemInfo; });
                delete _this.store[itemInfo.props.name];
            };
        };
        /**检验方法 */
        this.validate = function (isSubmit, name) {
            var err = [];
            var itemsArr = _this.itemsInfo;
            // console.log("🚀 ~ file: useForm.ts ~ line 84 ~ FormStore ~ itemsArr", itemsArr)
            //表单项触发onChange时-单独校验
            if (!isSubmit && !!name) {
                itemsArr = itemsArr.filter(function (i) { return i.props.name === name; });
            }
            //提交表单时-递归遍历校验
            itemsArr.forEach(function (item) {
                var _a, _b;
                var _c;
                var _d = item.props, rules = _d.rules, name = _d.name;
                var value = (_c = _this.getFieldValue(name)) === null || _c === void 0 ? void 0 : _c.value;
                //需要 required-true 校验
                if (((rules === null || rules === void 0 ? void 0 : rules.required) && !value) || (!!value && !!(rules === null || rules === void 0 ? void 0 : rules.validator) && !(rules === null || rules === void 0 ? void 0 : rules.validator(value)))) {
                    _this.errorStore = __assign(__assign({}, _this.errorStore), (_a = {}, _a[name] = (rules === null || rules === void 0 ? void 0 : rules.message) || name + " is required.", _a));
                    err.push((_b = {
                            value: value
                        },
                        _b[name] = (rules === null || rules === void 0 ? void 0 : rules.message) || name + " is required.",
                        _b));
                    //触发对应FormItem组件更新
                    console.log(item, '99999');
                    item.onStoreChange();
                }
            });
            return err;
        };
        /**提交表单 */
        this.submit = function () {
            //todo 这里要校验
            var err = _this.validate();
            // console.log("🚀 ~ file: useForm.ts ~ line 111 ~ FormStore ~ err", err)
            var _a = _this.callbcaks, onFinish = _a.onFinish, onFinishFailed = _a.onFinishFailed;
            // todo 判断校验的结果
            if ((err === null || err === void 0 ? void 0 : err.length) === 0) {
                //校验通过
                onFinish(_this.getFieldsValue());
            }
            else {
                onFinishFailed(err, _this.getFieldsValue());
            }
        };
        this.reset = function () {
            var _a;
            var keys = Object.keys(_this.store);
            keys.forEach(function (i) {
                var _a;
                _this.store = __assign(__assign({}, _this.store), (_a = {}, _a[i] = undefined, _a));
            });
            (_a = _this.itemsInfo) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                item === null || item === void 0 ? void 0 : item.onStoreChange();
            });
        };
        this.getFormInstance = function () {
            return {
                getFieldsValue: _this.getFieldsValue,
                getFieldValue: _this.getFieldValue,
                setFieldsValue: _this.setFieldsValue,
                setCallback: _this.setCallback,
                submit: _this.submit,
                reset: _this.reset,
                registerItemInfos: _this.registerItemInfos,
            };
        };
        this.store = {};
        this.callbcaks = {};
        this.itemsInfo = [];
        this.errorStore = {};
    }
    return FormStore;
}());
//函数组件使用此获取表单实例-返回表单实例数组
var useForm = function (form) {
    //创建一个独立的实例对象Ref,同一个，可变值
    var formRef = useRef();
    if (!formRef.current) {
        if (!!(form === null || form === void 0 ? void 0 : form.current)) {
            formRef.current = form === null || form === void 0 ? void 0 : form.current;
        }
        else {
            //创建一个表单实例对象
            var formInstance = new FormStore();
            formRef.current = formInstance.getFormInstance();
        }
    }
    return [formRef.current];
};
export default useForm;
