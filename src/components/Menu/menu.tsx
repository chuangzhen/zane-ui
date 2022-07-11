import React, { CSSProperties, createContext, useState } from "react";
import classnames from "classnames";
import {IMenuItemProps} from './menuItem'
// import './_style.scss'
import { chdir } from "process";

type TMunemode = 'vertical' | 'horizontal'
type TSelectCallback = (selectKey: string) => void
export interface IMenuProps {
  /**类名 */
  className?: string
  /**默认的活跃item */
  activeKey?: string
  /** vetical模式下才生效 */
  activeSubMenuKey?: string[]
  /**水平模式-vertical   垂直模式-horizontal, 默认vertical */
  mode?: TMunemode
  /**行内样式 */
  style?: CSSProperties
  /**全局选中方法 */
  onSelect?: TSelectCallback
}

interface IMenuContext {
  mode:TMunemode
  activeKey: string
  activeSubMenuKey?:string[]
  onSelect?: TSelectCallback
}

/**context-用于透传参数 */
export const MenuContext = createContext<IMenuContext>({mode:'vertical', activeKey: '', })

const MenuIndex: React.FC<IMenuProps> = (props) => {
  const { className = "", mode, style, activeKey = '', activeSubMenuKey=[],children, onSelect } = props
  /**当前活跃的下标-从0开始 */
  const [currentActiveKey, setActiveKey] = useState<string>('a')

  const classes = classnames('zane-ui-menu', className,
    {
      'menu-vertical': mode === 'vertical'
    },
    {
      'menu-horizontal': mode === 'horizontal'
    }
  )
  //点击选中当前active的menu & 用户自定义onSelect操作
  const handleClick = (key: string) => {
    setActiveKey(key)
    onSelect && onSelect(key)
  }

  const passedContext: IMenuContext = {
    mode:mode||'vertical',
    activeKey: currentActiveKey || '',
    activeSubMenuKey:[],
    onSelect: handleClick
  }
  

  /**Menu组件升级
   * 1.内部非menuItem组件不展示处理
   * 2.MenuItem的index非必传，没传按顺序给默认值 ,使用组件时，index就可以不传了
   * */
  const renderChildren = () => {
    return React.Children.map(children,(child,index) =>{
        console.log("🚀 ~ file: menu.tsx ~ line 67 ~ returnReact.Children.map ~ child", child)
        
        // child有很多其他的类型,ts没有提示displayName属性，使用ts的断言，将child断言为对应的React.FunctionComponentElement<IMenuItemProps> 组件类型，便可以获取到检测到语displayName属性
        const childElement  = child as React.FunctionComponentElement<IMenuItemProps>
        console.log('111--->' ,React.cloneElement(childElement));
        // React.FunctionComponentElement<IMenuItemProps> 属性有key props type ref  4个属性
       const {displayName=''} =  childElement.type

       if (['MenuItem','SubMenu'].includes(displayName)) {
         return React.cloneElement(childElement) 
       }else{
         console.error('Warning:Menu has a child which is not a MenuItem Component!')
       }
    })

  }
  return (
    <ul style={style || {}} className={classes} data-testid = 'test-menu' >
      < MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </ MenuContext.Provider>
    </ul>
  )
}

MenuIndex.defaultProps = {
  mode: 'vertical',
  activeKey: '',

}


export default MenuIndex