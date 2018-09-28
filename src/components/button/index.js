import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntdButton } from 'antd';
import BaseComponent from '~/components/baseComponent';
import { request } from '~/components/request';

/**
 * 按钮组件
 *
 * @export
 * @class Button
 * @extends {BaseComponent}
 */
export default class Button extends BaseComponent {
    static propTypes = {
        url: PropTypes.string,
        method: PropTypes.string,
        params: PropTypes.object,
        resolve: PropTypes.func,
        reject: PropTypes.func,
        onClick: PropTypes.func,
        waitForComplete: PropTypes.bool
    }

    static defaultProps = {
        url: null,
        method: 'get',
        params: null,
        resolve: null,
        reject: null,
        onClick: null,
        waitForComplete: true
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        return (
            <AntdButton loading={this.state.loading} onClick={() => this._onClick()} {...this.getRestProps()}>{this.props.children}</AntdButton>
        );
    }

    /**
     * 点击事件处理函数
     *
     * @memberof Button
     */
    _onClick() {
        if (!this.props.url || !this.props.method) {
            this.props.onClick && this.props.waitForComplete && this.setState({ loading: true });
            this.props.onClick && this.props.onClick(() => this.setState({ loading: false }));
            return;
        }

        request(this.props.url, this.props.method, this.props.params, data => {
            this.setState({ loading: false });
            this.props.resolve && this.props.resolve(data);
        }, error => {
            this.setState({ loading: false });
            this.props.reject && this.props.reject(error);
        })
    }
}
