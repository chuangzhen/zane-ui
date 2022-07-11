declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';

// declare module 'bizcharts-plugin-slider';
declare module 'mockjs';
// declare module '@antv/data-set';
// declare module '@antv/l7-react';

declare module 'react-fittext';

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  fbq: any;
  FB: any;
  paypal: any;
  isMobile:
    | boolean
    | {
        [key: string]: any;
        [key: number]: any;
      };
  isPad:
    | boolean
    | {
        [key: string]: any;
        [key: number]: any;
      };
  isPhone:
    | boolean
    | {
        [key: string]: any;
        [key: number]: any;
      };
}
