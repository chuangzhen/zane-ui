import React from "react";
import { fireEvent,render,RenderResult,cleanup } from "@testing-library/react";
import Menu ,{IMenuProps} from './menu'
import MenuItem ,{IMenuItemProps} from './menuItem'


const testProps:IMenuProps = {
    activeKey :'a',
    // jest.fn() 模拟选中事件函数
    onSelect:jest.fn(),
    className:'test'
}

const testVerProps:IMenuProps = {
    activeKey:'0',
    mode:'vertical'
}

const generateMenu = (props:IMenuProps) => {
    return <Menu {...props}>
        {/* index={0} */}
        <MenuItem key="a">active</MenuItem>
        <MenuItem key="b" disabled>disabled</MenuItem>
        <MenuItem key="c" >3333</MenuItem>
        {/* <li>我不是MenuItem</li> */}
    </Menu>
}


let warpper:RenderResult, menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement;
describe('test Menu & MenuItem component',() => {
    //通用模块，每一个it/test开始之前都会执行一次
    //beforeEach()
    beforeEach(() => {
        //渲染menu组件
        warpper = render(generateMenu(testProps))
        //RenderResule.getByTestId(XXX)  可以获得节点上的自定义属性 data-testid为XXX的节点
        menuElement = warpper.getByTestId('test-menu')
        
        // warpper.container == warpper对应的HTMLElement,可以使用Element对象上的各种方法
        //@ts-ignore
        activeElement = warpper.getByText('active')
        //@ts-ignore
        disabledElement = warpper.getByText('disabled')

    })
    //it() 等于test()的作用

    it('should render correct Menu and Menutem based on default props',() => {
        expect(menuElement).toBeInTheDocument()
        //测试--期望menuElement节点有类名
        expect(menuElement).toHaveClass('zane-ui-menu test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveTextContent(/^active$/)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    }) 
  
    it('click items should change active and call the callback',() => {
        const thirdItem = warpper.getByText("3333")
        //fireEvent模拟事件对象，有click focus等等事件方法
        fireEvent.click(thirdItem)

        //期望节点thirdItem有类名is-active

        //todo 待优化  key是特殊熟悉，没有传递到props里边，是跟props同级的熟悉
        expect(thirdItem).toHaveClass('is-active')
        //第一个menuitem组件没有class名   expect(xx).not.xxxx     xxm没有xxx
        expect(activeElement).not.toHaveClass('is-active') 
        
        //期望menu的onSelect方法被调用，并且接收到的参数是2
        expect(testProps.onSelect).toHaveBeenCalledWith(2)

        fireEvent.click(disabledElement)

        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })

    it('should render vertical mode when mode is set to  vertical ',() => {
        // test-library 每个it执行完都会默认执行cleanup()  清除上一次执行beforeEach渲染的节点，避免重复，这里手动在执行it模块之前清除cleanup().则beforeEach内渲染的节点已被清除，不可用
        cleanup()
        //执行完beforeEach后，有渲染了menu组件节点，重复了，报错
        //渲染挂载menu组件
        const warpper = render(generateMenu(testVerProps))
        //获取满足menu组件内，设置好的data-testid自定义属性的值的节点
        const menuElement = warpper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    //6-7 00:00


})