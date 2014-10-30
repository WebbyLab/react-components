/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var cx = React.addons.classSet;

require('font-awesome/css/font-awesome.min.css');
require('./FaIcon.less');

var FaIcon = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        onTouchTap: React.PropTypes.func
    },

    render() {
        var iconClass = cx({
            'WLCFaIcon': true,
            'fa': true,
            'clickable': this.props.onClick || this.props.onTouchTap
        });

        return (
            <i className={iconClass + ' fa-' + this.props.type}
                onClick={this.props.onClick}
                onTouchTap={this.props.onTouchTap} />
        );
    }
});

module.exports = FaIcon;
