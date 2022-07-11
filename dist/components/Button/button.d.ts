import React from "react";
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
declare type NavitiveButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NavitiveButtonProps & AnchorButtonProps>;
declare const Button: React.FC<ButtonProps>;
export default Button;
