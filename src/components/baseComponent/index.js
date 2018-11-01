import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';

/**
 * 基础组件
 *
 * @export
 * @class BaseComponent
 * @extends {React.Component}
 */
export default class BaseComponent extends React.Component {
    static childContextTypes = {
        parent: PropTypes.func // 父组件
    }

    static contextTypes = {
        parent: PropTypes.func // 父组件
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.initialize && this.initialize();
    }

    getChildContext() {
        return { parent: () => this };
    }

    /**
     * 获取父控件
     *
     * @returns 父控件
     * @memberof BaseComponent
     */
    getParent() {
        return !this.context.parent ? null : this.context.parent();
    }

    /**
     * 获取其余属性
     *
     * @returns 其余属性
     * @memberof BaseComponent
     */
    getRestProps() {
        if (!this.constructor.propTypes) {
            return this.props;
        }

        const props = {};
        Object.entries(this.props).forEach(prop => {
            const [key, value] = prop;
            if (!this.constructor.propTypes[key]) {
                props[key] = value;
            }
        });

        return props;
    }
}
