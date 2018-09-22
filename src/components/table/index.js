import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntdTable } from 'antd';
import BaseComponent from '@/components/baseComponent';
import Button from '@/components/button';
import Request, { getTableData } from '@/components/request';

/**
 * 数据表格组件
 *
 * @export
 * @class Table
 * @extends {BaseComponent}
 */
export default class Table extends BaseComponent {
    static propTypes = {
        url: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired,
        checkable: PropTypes.bool,
        actionBar: PropTypes.bool,
        actionBarWidth: PropTypes.number,
        actionBarView: PropTypes.any
    }

    static defaultProps = {
        url: null,
        columns: [],
        checkable: true,
        actionBar: true,
        actionBarWidth: 100,
        actionBarView: undefined
    }

    constructor(props) {
        super(props);
        this.selectedItems = [];
        this.state = {
            data: [],
            pagination: {
                current: 0,
                pageSize: 10,
                total: 0,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '50', '100']
            },
            loading: false
        };
    }

    componentDidMount() {
        this._onTableChange(this.state.pagination);
    }

    render() {
        return (
            <AntdTable
                columns={this._getColumns()}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                rowSelection={this.props.checkable ? { onChange: (selectedRowKeys, selectedRows) => this._onRowSelectionChange(selectedRowKeys, selectedRows) } : undefined}
                onChange={(pagination, filters, sorter) => this._onTableChange(pagination, filters, sorter)}
            />
        );
    }

    /**
     * 获取选中项目
     *
     * @returns 选中项目
     * @memberof Table
     */
    getSelectedItems() {
        return this.selectedItems;
    }

    /**
     * 获取列属性
     *
     * @returns 列属性
     * @memberof Table
     */
    _getColumns() {
        return this.props.actionBar ? this.props.columns.concat([{
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: this.props.actionBarWidth,
            render: this._getActionBar()
        }]) : this.props.columns;
    }

    /**
     * 获取操作栏视图
     *
     * @returns 操作栏视图
     * @memberof Table
     */
    _getActionBar() {
        if (typeof this.props.actionBarView === 'function') {
            return (text, record, index) => this.props.actionBarView((text, record, index));
        } else if (!!this.props.actionBarView) {
            return () => this.props.actionBarView
        } else {
            return (text, record, index) => (
                <div>
                    <Button icon="eye">查看</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                </div>
            );
        }
    }

    /**
     * 表格属性改变事件处理函数
     *
     * @param {*} pagination 分页
     * @param {*} filters 过滤条件
     * @param {*} sorter 排序
     * @memberof Table
     */
    _onTableChange(pagination, filters = {}, sorter = null) {
        const pager = {
            ...this.state.pagination,
            current: pagination.current,
            pageSize: pagination.pageSize
        };
        this.setState({
            pagination: pager,
            loading: true
        });

        const parameters = {
            results: pagination.pageSize,
            page: pagination.current,
            ...filters
        };

        if (sorter && (Object.keys(sorter).length > 0)) {
            parameters.sortField = sorter.field;
            parameters.sortOrder = sorter.order;
        }

        Request.get(this.props.url, {
            params: parameters
        }).then((response) => {
            this.setState({
                data: getTableData(response),
                loading: false
            });
        }).catch(() => {
            this.setState({
                data: [],
                loading: false
            });
        });
    }

    /**
     * 行选中事件处理函数
     *
     * @param {*} selectedRowKeys 选中行键值
     * @memberof Table
     */
    _onRowSelectionChange(selectedRowKeys) {
        this.selectedItems = selectedRowKeys;
    }
}
