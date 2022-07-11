import { ReactElement } from "react";
declare function FormProvider({ children, value }: {
    children: ReactElement;
    value: any;
}): JSX.Element;
declare function useFormContext(): any;
export { FormProvider, useFormContext };
