import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Button, { ButtonProps, ButtonType, ButtonSize } from "./button";


// test('ouer first react test case button', () => {
//   const wrapper = render(<Button>Nice</Button>)
//   const element = wrapper.queryAllByText('Nice')
//   expect(element).toBeTruthy()
//   expect(element).toBeInTheDocument()
// })
//1.组件分类
const defaultProps = {
  onClick: jest.fn()
}

const testButtonProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass',
  onClick: jest.fn(),
  disabled: true
}
const testLinkProps: ButtonProps = {
  btnType: ButtonType.Link,
  size: ButtonSize.Small,
  className: 'linkClass',
  onClick: jest.fn()
}

describe('test button component', () => {
  // test() == it()
  it('should render the correct default button', () => {
    const wrapper = render(<Button onClick={defaultProps.onClick}>Nice</Button>)
    //返回一个HTMLElement
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')

    //测试模拟点击事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()

  })
  it('should render the correct components base on  different props', () => {
    const wrapper = render(<Button {...testButtonProps}>Nice</Button>)
    //返回一个HTMLElement
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('渲染一个link 当有a链接的时候', () => {
    const wrapper = render(<Button {...testLinkProps}>LinkButton</Button>)
    //返回一个HTMLElement
    const element = wrapper.getByText('LinkButton')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-link btn-sm linkClass')
    fireEvent.click(element)
    expect(testLinkProps.onClick).toHaveBeenCalled()
  })
  it('渲染一个disabled Button 当有disabled属性的时候', () => {

    const wrapper = render(<Button {...testButtonProps}>disabledButton</Button>)
    //返回一个HTMLElement
    const element2 = wrapper.getByText('disabledButton')
    expect(element2).toBeInTheDocument()
    expect(element2).toHaveClass('btn-primary btn-lg klass')
    // expect(element2).toHaveAttribute('disabled')
    // fireEvent.click(element2)
    // expect(testButtonProps.onClick).toHaveBeenCalled()??


  })
})