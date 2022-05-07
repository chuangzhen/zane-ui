import React, { CSSProperties, useContext } from "react";
import classnames from "classnames";
import './_style.scss'
import { MenuContext } from "./menu";

type TMunemode = 'vertical' | 'horizontal'
export interface IMenuItemProps {
  className?: string
  /**用于比较index,显示高亮 */
  index: number
  style?: CSSProperties
  disabled?: boolean

}


const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const { className = "", index, style, disabled, children } = props

  const context = useContext(MenuContext)

  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    if (context?.onSelect && !disabled) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style || {}}
      onClick={handleClick}
    >{children}</li>)
}

export default MenuItem