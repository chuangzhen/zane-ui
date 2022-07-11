import { IFormInstance } from '..';
declare const useForm: (form: any) => (IFormInstance | {
    [key: string]: any;
})[];
export default useForm;
