/**
 * @jsx React.DOM
 */
'use strict';

var React   = require('react');
var cx      = require('react-classset');

require('./Input.less');

var Input = React.createClass({
    propTypes: {
         placeholder:     React.PropTypes.string,
         type:            React.PropTypes.string,
         label:           React.PropTypes.string,
         error:           React.PropTypes.string,
         warning:         React.PropTypes.string,
         disabled:        React.PropTypes.bool,
         onChange:        React.PropTypes.func
    },

    getInitialState() {
        return {
            value: this.props.value ? this.props.value : '',
            error: this.props.error ? this.props.error : '',
            warning: this.props.warning ? this.props.warning : '',
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            warning: nextProps.warning ? nextProps.warning : '',
            error: nextProps.error ? nextProps.error : '',
        });
    },

    handleChange(event) {
        var value = event.target.value;

        this.setState({
            value: value,
        });

        if (this.props.onChange) {
            if (this.props.dataMap) {
                this.props.onChange({
                    newValue: value,
                    path: this.props.dataMap,
                    valueToSend:value
                });
            } else this.props.onChange({newValue:value});
        }
    },

    handleBlur(event){
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    },

    handleFocus(){
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    },

    onKeyDown(event){
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    },


    render() {
        var warningNode = this.state.warning
            ? (<div className="animated fadeInUp">
                  <label className="warning-text warning">{this.state.warning}</label>
                  <div className="appendix warning"></div>
               </div>)
            : '';

        var errorNode = this.state.error
            ? (<div className="animated fadeInUp">
                   <label className="warning-text error">{this.state.error}</label>
                   <div className="appendix error"></div>
               </div>)
            : '';

        var inputClasses = cx({
            'warning': this.state.warning,
            'error': this.state.error,
        });

        var inputNode = <input ref         = "input"
                               style       = {this.props.style}
                               className      = {inputClasses}
                               type           = {this.props.type}
                               placeholder    = {this.props.placeholder}
                               value          = {this.state.value.toString()}
                               data-name      = {this.props.name}
                               onFocus        = {this.handleFocus}
                               onKeyDown      = {this.onKeyDown}
                               autoCapitalize = "off"
                               autoCorrect    = "off"
                               onBlur         = {this.handleBlur}
                               onChange       = {this.handleChange}
                               data-map       = {this.props.dataMap}
                               disabled       = {this.props.disabled}         />;

        return (
            <div className="Input">
                {inputNode}
                {warningNode}
                {errorNode}
            </div>

        );
    }
});

module.exports = Input;