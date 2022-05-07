import classNames from "classnames";
import React from "react";

const InputIndex:React.FC<any> = (props) => {
    const {value='',...rest} = props

    return <div className={classNames('input_padding')}>
        <input type="text" value={value}  {...rest} />

    </div>
}
InputIndex.displayName = 'input'

export default InputIndex