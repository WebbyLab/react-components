 /**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var cx = require('react-classset');

require('./WLCIcon.less');

var Icon = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func,
        value: React.PropTypes.string,
        type: React.PropTypes.string.isRequired,
    },

    handleClick(e){
        e.stopPropagation();
        e.preventDefault();
        if (this.props.onClick) {
            this.props.onClick();
        }
    },

    render() {
        var typeName = this.props.type;

        var iconClass = cx({
            'Icon'          : true,
            'clickable'     : this.props.onClick,
            // 'fa fa-circle-o': typeName == 'radio-button-unchecked' EXAMPLE FOR NEW ICON
        });

        return (
            <i className={ iconClass } onTouchTap={this.handleClick}>
                {this.props.value ? this.props.value : ''}
            </i>
        );
    }
});

module.exports = Icon;