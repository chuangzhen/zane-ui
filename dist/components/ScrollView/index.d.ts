import React, { ReactElement } from "react";
interface IProps {
    /**单元项渲染组件 */
    Component: ({ data }: {
        data: any;
    }) => ReactElement | ReactElement;
    /**滚动数据列表 */
    dataList: Array<any>;
    /**加载状态-true-不再触发触顶触底加载操作，false-可以触发触底触顶加载操作  */
    loading: boolean;
    /**true-还有更多的数据可加载，false-没有更多的了 */
    hasMore?: boolean;
    /**距离多少的时候触发加载更多操作  */
    distance?: number;
    /**滚动容器id -不传默认window滚动 |
     * 【注意：】scrollContinerId不能传节点，初始化时，子组件先执行render
     * 父组件再执行渲染，所以父组件中的滚动容器节点在子组件componentDidmount中是取不到节点信息，
     * 等初始化完成后才拿得到*/
    scrollContinerId?: string;
    onScroll?: (e: Event) => void;
    onScrollToBottom?: () => void;
    onScrollToTop?: () => void;
}
declare class ScrllView extends React.Component<IProps, any> {
    constructor(props: IProps | Readonly<IProps>);
    static getDerivedStateFromProps(newProps: {
        dataList: any;
    }): {
        list: any;
    };
    shouldComponentUpdate(newProps: Readonly<IProps>, newState: Readonly<IProps>): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleScrollToBottom(): void;
    handleScrollToTop(): void;
    handleScroll(e: Event): void;
    getScrollEle: () => Element | HTMLElement;
    render(): JSX.Element;
}
export default ScrllView;
