/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var cx = require('react-classset');
var Icon = require('./WLCIcon.jsx');

require('./WLCRadioButtonGroup.less');

var RadioButtonGroup = React.createClass({
    propTypes: {
        activeId: React.PropTypes.string,
        buttons: React.PropTypes.array.isRequired,
        disabled: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        display: React.PropTypes.string
    },

    getInitialState() {
        return {
            activeId: this.props.activeId
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeId: nextProps.activeId
        });
    },

    handleClick(id) {
        if (this.props.disabled) return;

        this.setState({
            activeId: id
        });

        this.props.onChange(data);
    },

    renderSingleBtn(btn,i) {
        var isActive = this.state.activeId === btn.id;

        var rectangleClass = cx({
            'active': isActive,
            'RadioBtnWithLabel': true,
        });

        var labelNode = btn.label
            ? <span onTouchStart={this.handleClick.bind(this, btn.id)}>{btn.label}</span>
            : '';

        if (this.props.display === 'rectangle') return (
            <div className={rectangleClass} key={btn.id} onTouchStart={this.handleClick.bind(this, btn.id)}>
                {labelNode}
            </div>
        );
        return (
            <div className='RadioBtnWithLabel' key={btn.id}>
                <Icon type={(btn.icon).toLowerCase()}
                      value={btn.iconText}
                      onClick={this.handleClick.bind(this, btn.id)} />
                {labelNode}
            </div>
        );
    },

    render() {
        var radioButtonsNode = this.props.buttons.map( (btn,i) => {
            return this.renderSingleBtn(btn,i);
        });

        var rootClass = cx({
            'RadioButtonGroup': true,
            'disabled': this.props.disabled,
            'rectangle': this.props.display === 'rectangle',
        });

        return (
            <div className={rootClass}>
                {radioButtonsNode}
            </div>
        );
    }
});

module.exports = RadioButtonGroup;