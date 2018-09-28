import React from 'react';
import PropTypes from 'prop-types';
import { Input as AntdInput, Form } from 'antd';
import BaseComponent from '~/components/baseComponent';

/**
 * 输入框组件
 *
 * @export
 * @class Form
 * @extends {BaseComponent}
 */
export default class Input extends BaseComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        url: PropTypes.string,
        method: PropTypes.string,
        params: PropTypes.object,
        label: PropTypes.string,
        hasFeedback: PropTypes.bool,
        help: PropTypes.string,
        required: PropTypes.bool,
        requiredMessage: PropTypes.string,
        rules: PropTypes.array,
        validator: PropTypes.func,
        initialValue: PropTypes.any
    }

    static defaultProps = {
        id: '123',
        url: null,
        method: 'get',
        params: null,
        label: undefined,
        hasFeedback: true,
        help: undefined,
        required: false,
        requiredMessage: undefined,
        rules: [],
        validator: undefined,
        initialValue: undefined
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };

        const newRules = [
            ...this.props.rules
        ];

        this.props.required && newRules.push({
            required: this.props.required,
            message: this.props.requiredMessage
        });

        this.props.validator && newRules.push({
            validator: this.props.validator
        });

        const { form, ...props } = this.getRestProps();

        return (
            <Form.Item
                {...formItemLayout}
                label={this.props.label}
                hasFeedback={this.props.hasFeedback}
                help={this.props.help}
            >
                {getFieldDecorator(this.props.id, {
                    rules: newRules,
                    initialValue: this.props.initialValue
                })(
                    <AntdInput {...props}>{this.props.children}</AntdInput>
                )}
            </Form.Item>
        );
    }
}
