import React from 'react';
import BaseComponent from '~/components/baseComponent';
import Form from '~/components/form';
import Input from '~/components/input';
import Button from '~/components/button';
import Table from '~/components/table';
import Select from '~/components/select';

/**
 * 列表视图
 *
 * @export
 * @class ListView
 * @extends {BaseComponent}
 */
export default class ListView extends BaseComponent {
    columns = [{
        title: 'id',
        dataIndex: 'id',
        sorter: true,
        width: '20%'
    }, {
        title: 'name',
        dataIndex: 'name',
        sorter: true
    }];

    render() {
        return (
            <div style={{ padding: 16, background: '#fff', minHeight: 360 }}>
                <Form>
                    <Input type="password" label="密码" required placeholder="请输入密码" />
                    <Button icon="search" onClick={sender => console.log(sender.getParent())}>查询</Button>
                </Form>
                <Select url="/api/v1/system/roleTypes" />
                <Button icon="search">查询</Button>
                <Table url="/api/v1/system/roles" columns={this.columns} />
            </div>
        );
    }
}
