import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import { Select as AntdSelect, Spin, Button } from 'antd';
import BaseComponent from '~/components/baseComponent';
import { request } from '~/components/request';

/**
 * 选择器组件
 *
 * @export
 * @class Select
 * @extends {BaseComponent}
 */
export default class Select extends BaseComponent {
    static propTypes = {
        url: PropTypes.string.isRequired,
        value: PropTypes.array.isRequired, // 数组内容为字符串格式键值
        multiple: PropTypes.bool,
        placeholder: PropTypes.string,
        width: PropTypes.string
    }

    static defaultProps = {
        url: null,
        value: [],
        multiple: false,
        placeholder: null,
        width: '200px'
    }

    state = {
        data: [],
        loading: false
    }

    constructor(props) {
        super(props);
        this.selectedItems = [];
    }

    componentDidMount() {
        super.componentDidMount();
        this._onSearch();
    }

    render() {
        return (
            <div>
                <AntdSelect
                    mode={!this.props.multiple ? undefined : "multiple"}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    defaultValue={this.props.value}
                    placeholder={this.props.placeholder}
                    notFoundContent={this.state.loading ? <Spin size="small" /> : this._getEmptyText()}
                    onSearch={(value) => this._onSearch(value)}
                    onChange={(value) => this._onChange(value)}
                    style={{ width: this.props.width }}
                >
                    {this.state.data.map(d => <AntdSelect.Option key={d.value}>{d.text}</AntdSelect.Option>)}
                    <AntdSelect.Option value="disabled" disabled>{this.state.loading ? <Spin size="small" style={{ paddingRight: "8px" }} /> : null}<Button size="small" icon="reload" onClick={() => this._onSearch()}>刷新</Button></AntdSelect.Option>
                </AntdSelect>
            </div>
        );
    }

    /**
     * 获取选中项目
     *
     * @returns 选中项目,数组内容为字符串格式键值
     * @memberof Table
     */
    getSelectedItems() {
        return this.selectedItems;
    }

    /**
     * 获取空数据视图
     *
     * @returns 空数据视图
     * @memberof Table
     */
    _getEmptyText() {
        return (
            <div>
                <span className="empty_text">{intl.get('components.select.empty_text')}</span>
                <Button size="small" icon="reload" onClick={() => this._onSearch()}>{intl.get('components.select.reload')}</Button>
            </div>
        );
    }

    /**
     * 搜索事件处理函数
     *
     * @param {*} [value=null] 搜索内容
     * @memberof Select
     */
    _onSearch(value = null) {
        this.setState({
            data: [],
            loading: true
        });

        const options = !value ? null : { params: value };

        request(this.props.url, 'get', options, data => {
            this.setState({
                data: data,
                loading: false
            });
        }, () => {
            this.setState({
                data: [],
                loading: false
            });
        });
    }

    /**
     * 选中内容变化事件处理函数
     *
     * @param {*} value 选中内容
     * @memberof Select
     */
    _onChange(value) {
        this.selectedItems = value;
    }
}
