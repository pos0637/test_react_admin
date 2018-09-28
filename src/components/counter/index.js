import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';

export default class Counter extends BaseComponent {
    static propTypes = {
        comment: PropTypes.string
    }

    static defaultProps = {
        comment: 'unknown'
    }

    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment
        };
    }

    render() {
        return (<div>I am counter. {this.state.comment}</div>);
    }

    foo() {
        this.setState({ comment: '223' });
        return '123';
    }
}
