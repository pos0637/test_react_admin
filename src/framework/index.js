import React from 'react';
import { Layout, Menu, Icon, Spin } from 'antd';
import intl from 'react-intl-universal';
import BaseComponent from '~/components/baseComponent';
import Iframe from '~/components/iframe';
import getMenus from '~/api/v1/system/menu';
import './index.scss';

/**
 * 主框架
 *
 * @export
 * @class MainFrame
 * @extends {BaseComponent}
 */
export default class Framework extends BaseComponent {
    state = {
        loadMenus: true // 加载菜单标识
    };

    componentDidMount() {
        getMenus(() => {
            this.setState({ loadMenus: false });
        });
    }

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            sorter: true,
            width: '20%'
        }, {
            title: 'name',
            dataIndex: 'name',
            sorter: true
        }];

        if (this.state.loadMenus) {
            return (<div className="loading"><Spin size="large" tip={intl.get('mainFrame.loading.tip')} /></div>);
        }
        else {
            return (
                <Layout>
                    <Layout.Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="video-camera" />
                                <span className="nav-text">nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="upload" />
                                <span className="nav-text">nav 3</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="user" />
                                <span className="nav-text">nav 4</span>
                            </Menu.Item>
                        </Menu>
                    </Layout.Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} />
                        <Layout.Content style={{ margin: '64px 0 0', overflow: 'initial' }}>
                            <Iframe style={{ width: '100%', height: '100%' }} url="./app_system_dictionary.html" />
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }}>
                            Ant Design ©2018 Created by Ant UED
                        </Layout.Footer>
                    </Layout>
                </Layout>
            );
        }
    }
}
