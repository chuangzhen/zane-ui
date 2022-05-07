import React from "react";
import { fireEvent,render,RenderResult } from "@testing-library/react";
import Menu ,{IMenuProps} from './menu'
import MenuItem ,{IMenuItemProps} from './menuItem'


const testProps:IMenuProps = {
    defaultIndex :0,
    onSelect:jest.fn(),
    className:'test'
}

const testVerProps:IMenuProps = {
    defaultIndex:0,
    mode:'vertical'
}

const generateMenu = (props:IMenuProps) => {
    return <Menu {...props}>
        <MenuItem index={0}>active</MenuItem>
        <MenuItem index={1} disabled>disabled</MenuItem>
        <MenuItem index={2}>xxx</MenuItem>
    </Menu>
}


let warpper:RenderResult, menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement;
describe('test Menu & MenuItem component',() => {
    //通用模块，每一个it/test开始之前都会执行一次
    //beforeEach()
    beforeEach(() => {
        warpper = render(generateMenu(testProps))
        //RenderResule.getByTestId(XXX)  可以获得节点上的自定义属性 data-testid为XXX的节点
        menuElement = warpper.getByTestId('test-menu')
        // warpper.container == warpper对应的HTMLElement,可以使用Element对象上的各种方法
        //@ts-ignore
        activeElement = warpper.getAllByText('active')
        //@ts-ignore
        disabledElement = warpper.getAllByText('disabled')
    })
    //it() 等于test()的作用

    it('should render correct Menu and Menutem based on default props',() => {
        expect(menuElement).toBeInTheDocument()
    })
  
    it('click items should change active and call the callback',() => {
        
    })

    it('should render vertical mode when mode is set to  vertical ',() => {

    })
})