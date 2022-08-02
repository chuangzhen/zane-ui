import React, { CSSProperties, useContext } from "react";
import classnames from "classnames";
// import './_style.scss'
import { MenuContext } from "./menu";

export interface IMenuItemProps {
  className?: string
  /**用于比较index,显示高亮 */
  value: string
  style?: CSSProperties
  disabled?: boolean

}


const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { className = "", value, style, disabled, children } = props
  // console.log("🚀 ~ file: menuItem.tsx ~ line 19 ~ props", props)

  const context = useContext(MenuContext)

  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.activeKey === value
  })
  // console.log(context,"🚀 ~ file: menuItem.tsx ~ line 18 ~ props", props)

  const handleClick = () => {
    if (context?.onSelect && !disabled && (typeof value === 'string')) {
      context.onSelect(value)
    }
  }

  return (
    <li className={classes} style={style || {}}
      onClick={handleClick}
    >{children}</li>)
}

MenuItem.displayName = 'MenuItem'

export default MenuItem