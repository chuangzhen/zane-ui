var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
import { throttle } from '../../utils/util';
var ScrllView = /** @class */ (function (_super) {
    __extends(ScrllView, _super);
    function ScrllView(props) {
        var _this = _super.call(this, props) || this;
        _this.getScrollEle = function () {
            var _a, _b;
            var scrollEle = null;
            if ((_a = _this.props) === null || _a === void 0 ? void 0 : _a.scrollContinerId) {
                scrollEle = document.querySelector("#".concat((_b = _this.props) === null || _b === void 0 ? void 0 : _b.scrollContinerId));
            }
            else {
                scrollEle = (document === null || document === void 0 ? void 0 : document.body) || (document === null || document === void 0 ? void 0 : document.documentElement);
            }
            return scrollEle;
        };
        _this.state = {
            list: [],
            scrollTop: 0,
            bottomLock: false,
            topLock: false
        };
        _this.handleScrollToBottom = _this.handleScrollToBottom.bind(_this);
        _this.handleScrollToTop = throttle(_this.handleScrollToTop.bind(_this), 500);
        return _this;
    }
    ScrllView.getDerivedStateFromProps = function (newProps) {
        var dataList = newProps.dataList;
        return {
            list: dataList
        };
    };
    //性能优化-只有数据发生变化才更新滚动容器
    ScrllView.prototype.shouldComponentUpdate = function (newProps, newState) {
        return newProps.dataList !== this.state.list;
    };
    // //更新前
    // getSnapshotBeforeUpdate() {
    // }
    // //更新后
    // componentDidUpdate(preProps: any, preState: any, snapshot: any) {
    // }
    //页面初次完成渲染挂载
    ScrllView.prototype.componentDidMount = function () {
        var _a, _b;
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.scrollContinerId) {
            var scrollEle = document.querySelector("#".concat((_b = this.props) === null || _b === void 0 ? void 0 : _b.scrollContinerId));
            scrollEle === null || scrollEle === void 0 ? void 0 : scrollEle.addEventListener('scroll', this.handleScroll.bind(this));
        }
        else {
            window === null || window === void 0 ? void 0 : window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    };
    //组件卸载前
    ScrllView.prototype.componentWillUnmount = function () {
        var _a, _b;
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.scrollContinerId) {
            var scrollEle = document.querySelector("#".concat((_b = this.props) === null || _b === void 0 ? void 0 : _b.scrollContinerId));
            scrollEle === null || scrollEle === void 0 ? void 0 : scrollEle.removeEventListener('scroll', this.handleScroll);
        }
        else {
            window === null || window === void 0 ? void 0 : window.removeEventListener('scroll', this.handleScroll);
        }
    };
    //触底操作
    ScrllView.prototype.handleScrollToBottom = function () {
        var _this = this;
        var scrollEle = this.getScrollEle();
        if (scrollEle) {
            //@ts-ignore
            var scrollHeight = scrollEle.scrollHeight, scrollTop = scrollEle.scrollTop, offsetHeight = scrollEle.offsetHeight;
            // console.log('handleScrollToBottom',scrollHeight , scrollTop ,  offsetHeight);
            var _a = this.props, distance = _a.distance, loading = _a.loading, onScrollToBottom = _a.onScrollToBottom;
            var bottomLock = this.state.bottomLock;
            //lock是限制在使用scrollVlew的时候，没有正确传递loading时做的定时限制
            if ((scrollHeight <= scrollTop + offsetHeight + distance) && !loading && !bottomLock) {
                onScrollToBottom && onScrollToBottom();
                this.setState({ bottomLock: true }, function () {
                    setTimeout(function () {
                        _this.setState({ bottomLock: false });
                    }, 500);
                });
            }
        }
    };
    //触顶操作
    ScrllView.prototype.handleScrollToTop = function () {
        var _this = this;
        var scrollEle = this.getScrollEle();
        if (scrollEle) {
            //@ts-ignore
            var scrollHeight = scrollEle.scrollHeight, scrollTop = scrollEle.scrollTop, offsetHeight = scrollEle.offsetHeight;
            var _a = this.props, _b = _a.distance, distance = _b === void 0 ? 0 : _b, loading = _a.loading, onScrollToTop = _a.onScrollToTop;
            var topLock = this.state.topLock;
            if ((scrollTop <= distance) && !loading && !topLock) {
                onScrollToTop && onScrollToTop();
                this.setState({ topLock: true }, function () {
                    setTimeout(function () {
                        _this.setState({ topLock: false });
                    }, 500);
                });
            }
        }
    };
    // 滚动操作
    ScrllView.prototype.handleScroll = function (e) {
        var _a;
        ((_a = this.props) === null || _a === void 0 ? void 0 : _a.onScroll) && this.props.onScroll(e);
        var scrollEle = this.getScrollEle();
        if (scrollEle) {
            // const {top=0,bottom=0} = scrollEle?.getBoundingClientRect()
            var innerHeight_1 = window.innerHeight;
            //@ts-ignore
            var scrollHeight = scrollEle.scrollHeight, scrollTop = scrollEle.scrollTop, offsetHeight = scrollEle.offsetHeight;
            // console.log(scrollHeight , scrollTop ,  offsetHeight,innerHeight);
            if (this.state.scrollTop > scrollTop) {
                this.handleScrollToTop();
            }
            else {
                this.handleScrollToBottom();
            }
            this.setState({ scrollTop: scrollTop });
        }
    };
    ScrllView.prototype.render = function () {
        var list = this.state.list;
        var Component = this.props.Component;
        return React.createElement("div", { id: 'scroll_view_container' },
            React.createElement("div", null, this.state.scrollTop),
            list.map(function (i) { return React.createElement(Component, { data: i, key: i === null || i === void 0 ? void 0 : i.id }); }));
    };
    return ScrllView;
}(React.Component));
export default ScrllView;
