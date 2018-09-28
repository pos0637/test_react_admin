import React from 'react';
import { render } from 'react-dom';
import intl from 'react-intl-universal';
import { Spin } from 'antd';
import MainFrame from '~/framework/mainFrame';
import '~/mock';

/**
 * 多语言
 */
const locales = {
    'zh-CN.framework': require('~/locales/zh-CN.json'),
    'zh-CN': require('~/app/locales/zh-CN.json')
};

/**
 * 主应用
 *
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
    state = { loadLocale: false }

    componentDidMount() {
        const currentLocale = 'zh-CN';
        Object.assign(locales[currentLocale], locales[`${currentLocale}.framework`]);

        intl.init({
            currentLocale: currentLocale, locales
        }).then(() =>
            this.setState({ loadLocale: true })
        )
    }

    render() {
        const { loadLocale } = this.state;
        return (
            loadLocale ? <MainFrame /> : <Spin />
        );
    }
}

render(<App />, document.getElementById('root'));
