import type { StringBuffer, HtmlEscaped, HtmlEscapedString } from '../utils/html';
declare type Props = Record<string, any>;
declare global {
    namespace JSX {
        type Element = HtmlEscapedString;
        interface ElementChildrenAttribute {
            children: Child;
        }
        interface IntrinsicElements {
            [tagName: string]: Props;
        }
    }
}
declare type Child = string | number | JSXNode | Child[];
export declare class JSXNode implements HtmlEscaped {
    tag: string | Function;
    props: Props;
    children: Child[];
    isEscaped: true;
    constructor(tag: string | Function, props: Props, children: Child[]);
    toString(): string;
    toStringToBuffer(buffer: StringBuffer): void;
}
export { jsxFn as jsx };
declare const jsxFn: (tag: string | Function, props: Props, ...children: (string | HtmlEscapedString)[]) => JSXNode;
export declare type FC<T = Props> = (props: T & {
    children?: Child;
}) => HtmlEscapedString;
export declare const memo: <T>(component: FC<T>, propsAreEqual?: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean) => FC<T>;
export declare const Fragment: (props: {
    key?: string;
    children?: Child[];
}) => HtmlEscapedString;
