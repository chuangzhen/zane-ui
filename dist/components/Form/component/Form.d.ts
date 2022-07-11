import React from "react";
import { IFormInstance } from '..';
interface IFormProps {
    children?: any;
    /**Form接收onFinish回调 提交表单数据 */
    onFinish: (data: any) => void;
    onFinishFailed: (err: string, values: any) => void;
    form?: IFormInstance;
    [key: string]: any;
}
declare type Forms = React.ForwardRefExoticComponent<React.PropsWithoutRef<IFormProps> & React.RefAttributes<any>>;
declare const ForWardForm: Forms;
export default ForWardForm;
