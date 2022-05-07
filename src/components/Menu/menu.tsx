import React, { CSSProperties, createContext, useState } from "react";
import classnames from "classnames";
import './_style.scss'

type TMunemode = 'vertical' | 'horizontal'
type TSelectCallback = (selectIndex: number) => void
export interface IMenuProps {
  /**类名 */
  className?: string
  /**默认的活跃item */
  defaultIndex?: number
  /**水平模式-vertical   垂直模式-horizontal */
  mode?: TMunemode
  /**行内样式 */
  style?: CSSProperties
  /**全局选中方法 */
  onSelect?: TSelectCallback
}

interface IMenuContext {
  index: number
  onSelect?: TSelectCallback
}

/**context-用于透传参数 */
export const MenuContext = createContext<IMenuContext>({ index: 0 })

const MenuIndex: React.FC<IMenuProps> = (props) => {
  const { className = "", mode, style, defaultIndex = 0, children, onSelect } = props
  /**当前活跃的下标-从0开始 */
  const [currentActive, setActive] = useState<number>(defaultIndex)

  const classes = classnames('zaneui-menu', className,
    {
      'menu-vertical': mode === 'vertical'
    },
    {
      'menu-horizontal': mode === 'horizontal'
    }
  )
  //点击选中当前active的menu & 用户自定义onSelect操作
  const handleClick = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    index: currentActive || 0,
    onSelect: handleClick
  }

  return (
    <ul style={style || {}} className={classes} data-testid = 'test-menu' >
      < MenuContext.Provider value={passedContext}>
        {children}
      </ MenuContext.Provider>
    </ul>
  )
}

MenuIndex.defaultProps = {
  mode: 'horizontal',
  defaultIndex: 0,

}


export default MenuIndex