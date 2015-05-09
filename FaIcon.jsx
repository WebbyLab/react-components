/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var classNames = require('classnames');

require('font-awesome/css/font-awesome.min.css');
require('./FaIcon.less');

var FaIcon = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        onTouchTap: React.PropTypes.func
    },

    render() {
        var iconClass = classNames({
            'WLC-FaIcon': true,
            'fa': true,
            'WLC-clickable': this.props.onClick || this.props.onTouchTap
        });

        return (
            <i className={iconClass + ' fa-' + this.props.type}
                onClick={this.props.onClick}
                onTouchTap={this.props.onTouchTap} />
        );
    }
});

module.exports = FaIcon;
