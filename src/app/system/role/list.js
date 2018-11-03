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
    }]

    render() {
        return (
            <div style={{ padding: 16, background: '#fff', minHeight: 360 }}>
                <Form name="form1">
                    <Input id="input1" type="password" label="密码" required placeholder="请输入密码" />
                    <Button icon="search" onClick={() => console.log(this.getView().child('form1').getFieldsValue())}>查询</Button>
                </Form>
                <Form name="form2">
                    <Input id="input2" type="password" label="密码" required placeholder="请输入密码" />
                    <Button icon="search" onClick={() => console.log(this.getView().child('form1').getFieldsValue())}>查询</Button>
                </Form>
                <Select url="/api/v1/system/roleTypes" />
                <Button icon="search">查询</Button>
                <Table name="table1" url="/api/v1/system/roles" columns={this.columns} />
            </div>
        );
    }
}
