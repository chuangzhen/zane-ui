import React from "react";
var FormContext = React.createContext(undefined);
function FormProvider(_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(FormContext.Provider, { value: value }, children));
}
function useFormContext() {
    var context = React.useContext(FormContext);
    if (context === undefined) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}
export { FormProvider, useFormContext };
