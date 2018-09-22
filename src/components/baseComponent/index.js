import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/**
 * 基础组件
 *
 * @export
 * @class BaseComponent
 * @extends {React.Component}
 */
export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    /**
     * 获取父控件
     *
     * @returns 父控件
     * @memberof BaseComponent
     */
    getParent() {
        return this._reactInternalInstance._currentElement._owner._instance;
    }
}
