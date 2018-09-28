import React from 'react';
import PropTypes from 'prop-types';
import { Form as AntdForm } from 'antd';
import BaseComponent from '~/components/baseComponent';

/**
 * 表单组件
 *
 * @export
 * @class _Form
 * @extends {BaseComponent}
 */
class _Form extends BaseComponent {
    static propTypes = {
        url: PropTypes.string,
        method: PropTypes.string,
        params: PropTypes.object
    }

    static defaultProps = {
        url: null,
        method: 'get',
        params: null
    }

    state = {
        loading: false
    };

    render() {
        return (
            <AntdForm>
                {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, { form: this.props.form })
                )}
            </AntdForm>
        );
    }
}

const Form = AntdForm.create()(_Form);
export default Form;