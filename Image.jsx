/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var Image = React.createClass({
    propTypes: {
        src: React.PropTypes.string,
        placeholder: React.PropTypes.object // DOM ELEMENT
    },

    getDefaultProps() {
        return {
            placeholder: (<div />)
        };
    },

    getInitialState() {
        return {
            src: this.props.src
        };
    },

    handleImageLoadError() {
        this.setState({
            src: undefined
        });
    },

    render() {
        return this.state.src
            ? <img className='WLC-Image'
                   src={this.state.src}
                   onError={this.handleImageLoadError} />
            : this.props.placeholder;
     }
});

module.exports = Image;