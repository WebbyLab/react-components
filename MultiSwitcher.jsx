/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var cx = require('react-classset');
var _ = require('lodash');

require('./MultiSwitcher.less');

var BORDER_SIZE = 3;

var MultiSwitcher = React.createClass({
    propTypes: {
        activeId: React.PropTypes.string,
        buttons: React.PropTypes.array.isRequired,
        disabled: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        display: React.PropTypes.string
    },

    getInitialState() {
        var activeButton = _.find(this.props.buttons, (btn) => { return btn.id == this.props.activeId; });

        return {
            activeId: this.props.activeId,
            activeLabel: activeButton.label,
            left: 0,
            width: 0
        };
    },

    componentWillReceiveProps(nextProps) {
        var activeButton = _.find(this.props.buttons, (btn) => { return btn.id == nextProps.activeId; });

        this.setState({
            activeId: nextProps.activeId,
            activeLabel: activeButton.label
        });
    },

    getSelectedValue() {
        return this.state.activeId;
    },

    handleClick(id,label) {
        if (this.props.disabled) return;

        this.setState({
            activeId: id,
            activeLabel: label
        });

        if (this.props.dataMap) {
            var data = {path:this.props.dataMap, newValue:id};

            this.delayedHandleChange(data);
        }

        if (this.props.onChange && !this.props.dataMap) {
            this.delayedHandleChange(id);
        }
    },

    delayedHandleChange: _.debounce(function (data) { this.props.onChange(data); }, 200),

    renderSingleBtn(btn) {
        var isActive = this.state.activeId === btn.id;

        var rectangleClass = cx({
            'WLC-active': isActive,
            'WLC-RadioBtnWithLabel': true,
        });

        var labelNode = btn.label
            ? <span onTouchTap={this.handleClick.bind(this, btn.id, btn.label)}>{btn.label}</span>
            : '';

        return (
            <div ref={isActive ? 'active' : ''}
                 className={rectangleClass}
                 key={btn.id}
                 onTouchTap={this.handleClick.bind(this, btn.id, btn.label)}>
                {labelNode}
            </div>
        );
    },

    componentDidMount() {
        var element = $(this.refs.active.getDOMNode())[0];

        this.setState({
            left: $(element).offsetLeft,
            width: $(element).css('width')
        });
    },

    componentDidUpdate() {
        var element = $(this.refs.active.getDOMNode())[0];

        this.setState({
            left: element.offsetLeft,
            width: $(element).css('width')
        });
    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.activeId != this.state.activeId ||
               nextProps.activeId != this.props.activeId ||
               nextProps.disabled != this.props.disabled ||
               nextState.left != this.state.left;
    },

    render() {
        var curtainStyle = {
            '-webkit-transform': `translateX(${this.state.left + BORDER_SIZE}px)`,
            '-ms-transform': `translateX(${this.state.left + BORDER_SIZE}px)`,
            transform: `translateX(${this.state.left + BORDER_SIZE}px)`,
            width: this.state.width
        };

        var curtainNode = (
            <div className='WLC-curtain' style={curtainStyle}>
                {this.state.activeLabel}
            </div>
        );

        var radioButtonsNode = _.map(this.props.buttons,(btn,i) => {
            return this.renderSingleBtn(btn,i);
        });

        var rootClass = cx({
            'WLC-MultiSwitcher': true,
            'WLC-disabled': this.props.disabled,
        });

        return (
            <div className={rootClass}>
                {curtainNode}
                {radioButtonsNode}
            </div>
        );
    }
});

module.exports = MultiSwitcher;