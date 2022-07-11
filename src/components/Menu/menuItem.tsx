import React, { CSSProperties, useContext } from "react";
import classnames from "classnames";
// import './_style.scss'
import { MenuContext } from "./menu";

type TMunemode = 'vertical' | 'horizontal'
export interface IMenuItemProps {
  className?: string
  /**用于比较index,显示高亮 */
  key?: string
  style?: CSSProperties
  disabled?: boolean

}


const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { className = "", key, style, disabled, children } = props
  
  const context = useContext(MenuContext)
  
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.activeKey === key
  })
  console.log(context,"🚀 ~ file: menuItem.tsx ~ line 18 ~ props", props)

  const handleClick = () => {
    if (context?.onSelect && !disabled && (typeof key === 'string')) {
      context.onSelect(key)
    }
  }

  return (
    <li className={classes} style={style || {}}
      onClick={handleClick}
    >{children}</li>)
}

MenuItem.displayName = 'MenuItem'

export default MenuItem