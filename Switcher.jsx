/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var cx = React.addons.classSet;
var _ = require('lodash');

require('./Switcher.less');

var Switcher = React.createClass({
    propTypes: {
        disabled:    React.PropTypes.bool,
        isEnabled:   React.PropTypes.bool,
        onClick:     React.PropTypes.func,
        style:       React.PropTypes.string,
    },

    getInitialState() {
        return {
            isEnabled: this.props.isEnabled,
        };
    },

    _handleClick() {
        if (this.props.disabled) return;

        var isEnabled = !this.state.isEnabled;

        this.setState({
            isEnabled: isEnabled,
        });

        if (this.props.onClick) {
            this.delayedHandleClick(isEnabled);
        }
    },

    delayedHandleClick: _.debounce(function (data) { this.props.onClick(data); }, 200),

    componentWillReceiveProps(nextProps) {
        this.setState({
            isEnabled: nextProps.isEnabled
        });
    },

    render() {
        var curtainPosition = this.state.isEnabled ? '50%' : '0';
        var curtainStyle    = {left: curtainPosition};
        var switcherClass   = cx({
            'WLC-Switcher': true,
            'WLC-disabled': this.props.disabled
        });

        return (
            <div className={switcherClass} onTouchTap={this._handleClick}>
                <div className='WLC-curtain' style={curtainStyle}/>
                <div className='WLC-on'>YES</div>
                <div className='WLC-off'>NO</div>
            </div>
        );
    }
});

module.exports = Switcher;