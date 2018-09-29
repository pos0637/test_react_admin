import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import { Spin } from 'antd';
import '~/mock';

/**
 * 应用
 *
 * @class Application
 * @extends {React.Component}
 */
export default class Application extends React.Component {
    static propTypes = {
        currentLocale: PropTypes.string,
        locales: PropTypes.array
    }

    static defaultProps = {
        currentLocale: 'zh-CN.framework',
        locales: {}
    }

    state = { loadLocale: false }

    componentDidMount() {
        const locales = {
            'zh-CN.framework': require('~/locales/zh-CN.json')
        };

        Object.assign(this.props.locales[this.props.currentLocale], locales[`${this.props.currentLocale}.framework`]);
        Object.assign(locales, this.props.locales);

        intl.init({
            currentLocale: this.props.currentLocale, locales
        }).then(() =>
            this.setState({ loadLocale: true })
        )
    }

    render() {
        const { loadLocale } = this.state;

        return (
            loadLocale ? <div>{this.props.children}</div> : <Spin />
        );
    }
}
