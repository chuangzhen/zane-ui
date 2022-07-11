import React, { forwardRef, useImperativeHandle } from "react";
import { FormProvider } from './useFormItemsContext';
import { useForm } from '..';
var Form = function (props, ref) {
    var children = props.children, form = props.form, onFinish = props.onFinish, onFinishFailed = props.onFinishFailed;
    var formInstance = useForm(form)[0];
    console.log(ref, "🚀 ~ file: Form.tsx ~ line 20 ~ Form ~ formInstance", formInstance);
    /**将实例对象暴露给Form 的父组件传递给Form的ref变量 */
    useImperativeHandle(ref, function () { return formInstance; });
    //将Form的父组件传递的提交函数透传给实例对象
    //@ts-ignore
    formInstance.setCallback({ onFinish: onFinish, onFinishFailed: onFinishFailed });
    return React.createElement("form", { className: "zane_form", onSubmit: function (e) {
            e.preventDefault();
            console.log('触发form的onSubmit');
            formInstance === null || formInstance === void 0 ? void 0 : formInstance.submit();
        }, onReset: function (e) {
            e.preventDefault();
            console.log('reset');
            formInstance === null || formInstance === void 0 ? void 0 : formInstance.reset();
        } },
        React.createElement(FormProvider, { value: formInstance }, React.cloneElement(children)));
};
var ForWardForm = forwardRef(Form);
export default ForWardForm;
