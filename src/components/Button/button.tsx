import React, { } from "react";
import classnames from "classnames";

export type ButtonSize = 'lg'| 'sm'

export type ButtonType  = 'primary' | 'default' | 'danger'| 'link'
 

interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children: React.ReactNode
  href?: string
}

type NavitiveButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>

//给button组件带上默认的HTML的button元素的自带属性，这样默认就可以.出其他的属性
export type ButtonProps = Partial<NavitiveButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className = '',
    disabled = false,
    size = 'lg',
    btnType = 'primary',
    href,
    children,
    ...restProps
  } = props


  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })

  if (btnType === 'link' && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}


export default Button