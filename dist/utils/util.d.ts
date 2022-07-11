interface IUAProps {
    ie?: any;
    firefox?: any;
    chrome?: any;
    opera?: any;
    safari?: any;
    android?: any;
    iphone?: any;
    ipad?: any;
    ipad13?: any;
    ios?: any;
    isWin32?: any;
    isWeixin?: any;
    isUcweb?: any;
    isMqq?: any;
    isWeiBo?: any;
    isMobile?: any;
}
export declare const getUA: () => IUAProps;
export declare function initRem(): void;
export declare function sleep(time: number): void;
export declare function debounce(fn: Function, delay?: number, immediate?: boolean): (this: any) => void;
export declare function throttle(fn: Function, delay: number, immediate?: boolean): () => void;
export {};
