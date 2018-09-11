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
        mixins: [PureRenderMixin]
    }
}
