import React from 'react';
import { Button as AntdButton } from 'antd';
import BaseComponent from '@/components/baseComponent';

/**
 * 按钮组件
 *
 * @export
 * @class Button
 * @extends {BaseComponent}
 */
export default class Button extends BaseComponent {
    render() {
        return (
            <AntdButton {...this.props}>{this.props.children}</AntdButton>
        );
    }
}
