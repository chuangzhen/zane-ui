import React, { CSSProperties, FunctionComponentElement, useContext, useState } from "react";
import classnames from "classnames";
// import './_style.scss'
import { MenuContext } from "./menu";
import { IMenuItemProps } from "./menuItem";

export interface ISubMenuProps {
  title: string
  /**用于比较index,显示高亮 */
  key: string
  className?: string
  style?: CSSProperties
  disabled?: boolean
}


const SubMenu: React.FC<ISubMenuProps> = (props) => {
  const { title = '', className = "", key, style, disabled, children } = props

  const context = useContext(MenuContext)

  const isOpen = context.mode === 'vertical' && context.activeSubMenuKey?.includes(key)

  const [subMenuOpen, setSubMenuOpen] = useState(isOpen)

  const classes = classnames('menu-item submenu-item', className, {
    'is-disabled': disabled,
    'is-opened':subMenuOpen,
    'is-active': context.activeKey === key,
    'is-vertical': context.mode === 'vertical'
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubMenuOpen(!subMenuOpen)
  }
  let timer: NodeJS.Timeout
  const handleMouse = (e: React.MouseEvent, triggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()

    timer = setTimeout(() => {
      setSubMenuOpen(triggle)
    }, 300)
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  }:{}



  const renderChildren = () => {
    const submenuClasses = classnames('zane-submenu', {
      'menu-opened': subMenuOpen
    })

    const childComponents = React.Children.map(children, (child, idx) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement)
      } else {
        console.log('Warning:submenu has a child which is not a MenuItem Component!')
      }
    })


    return <ul className={submenuClasses}>
      {childComponents}
    </ul>
  }

  return (
    <li className={classes} style={style || {}} {...hoverEvents} key={key}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <span className="arrow-icon">{'>'}</span>
      </div>
      {renderChildren()}
    </li>


  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu