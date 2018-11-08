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

    /**
     *
     *
     * @returns
     * @memberof ListView
     */
    render() {
        return (
            <div style={{ padding: 16, background: '#fff', minHeight: 360 }}>
                <Form name="form1">
                    <Input id="name" type="text" label="名称" placeholder="请输入名称" />
                    <Select id="roleTypes" url="/api/v1/system/roleTypes" label="角色" placeholder="请选择角色" />
                </Form>
                <Button name="btn_search" icon="search" onClick={() => this._onSearch()}>查询</Button>
                <Table name="table1" url="/api/v1/system/roles" columns={this.columns} onLoadComplete={() => this._onLoadComplete()} />
            </div>
        );
    }

    _onSearch() {
        const params = this.getView().child('form1').getFieldsValue();
        console.log(params);
        this.getView().child('table1').reload(params);
    }

    _onLoadComplete() {
        this.getView().child('btn_search').complete();
    }
}
