import React from 'react';
import { Layout, Menu, Icon, Spin } from 'antd';
import BaseComponent from '@/components/baseComponent';
import Table from '@/components/table';
import Select from '@/components/select';
import getMenus from '@/api/v1/system/menu';
import 'antd/dist/antd.css';
import './mainFrame.scss';

/**
 * 主框架
 *
 * @export
 * @class MainFrame
 * @extends {BaseComponent}
 */
export default class MainFrame extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            // 加载菜单标识
            loadMenus: true
        };

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
            return (<div className="loading"><Spin size="large" tip="正在加载，请稍等..." /></div>);
        }
        else {
            return (
                <Layout>
                    <Layout.Sider breakpoint="lg" collapsedWidth="0">
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
                    <Layout>
                        <Layout.Header style={{ background: '#fff', padding: 0 }} />
                        <Layout.Content style={{ margin: '24px 16px 0' }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Select url='/api/v1/system/moduleTypes' />
                                <Table url='/api/v1/system/modules' columns={columns} />
                            </div>
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
