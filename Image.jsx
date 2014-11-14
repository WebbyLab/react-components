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

    getInitialState() {
        return {
            image: this.props.src
        };
    },

    handleImageLoadError() {
        this.setState({
            image: undefined
        });
    },

    render() {
        return this.state.image
            ? <img className='WLC-Image'
                   src={this.state.image}
                   onError={this.handleImageLoadError} />
            : this.props.placeholder;
     }
});

module.exports = Image;