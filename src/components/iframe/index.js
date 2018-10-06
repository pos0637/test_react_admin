import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BaseComponent from '~/components/baseComponent';

export default class Iframe extends BaseComponent {
    static propTypes = {
        url: PropTypes.string.isRequired
    }

    static defaultProps = {
        url: null
    }

    state = {
        height: '100%'
    };

    render() {
        return (
            <iframe
                src={this.props.url}
                width="100%"
                height={this.state.height}
                scrolling="no"
                frameBorder="0"
                style={{ width: '100%', height: this.state.height, overflow: 'scroll' }}
                onLoad={() => {
                    const { scrollHeight } = ReactDOM.findDOMNode(this).contentWindow.document.body;                    
                    this.setState({ height: `${scrollHeight}px` });
                }}
            />
        );
    }
}
