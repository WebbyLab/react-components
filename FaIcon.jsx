/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
require('font-awesome/css/font-awesome.min.css');

var FaIcon = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <i className={'WLCFaIcon fa fa-'+this.props.type} />
        );
    }
});

module.exports = FaIcon;
