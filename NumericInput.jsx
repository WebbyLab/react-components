var React = require('react');
var cx = React.addons.classSet;
var numeral = require('numeral');

require('./NumericInput.less');

var NumericInput = React.createClass({
    propTypes: {
        placeholder:     React.PropTypes.string,
        type:            React.PropTypes.string,
        label:           React.PropTypes.string,
        error:           React.PropTypes.string,
        warning:         React.PropTypes.string,
        disabled:        React.PropTypes.bool,
        isNotExpandable: React.PropTypes.bool,
        onChange:        React.PropTypes.func
    },

    getInitialState() {
        return {
            value: this.props.value !== undefined ? this.props.value : '5',
            min: this.props.min ? this.props.min : 0,
            max: this.props.max ? this.props.max : 10,
            isValid: this.props.isValid ? this.props.isValid : true,
            formattedValue: this.props.value !== undefined ? this.formatValue(this.props.value) : '',
            focused: false,
        };
    },

    componentWillMount() {
        this.setState({
            error: this._checkLimits(this.state.value) ? '' : 'OUT OF LIMITS',
        });
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            error: this._checkLimits(nextProps.value) ? '' : 'OUT OF LIMITS',
            value: nextProps.value,
            min: nextProps.min,
            max: nextProps.max,
            formattedValue: this.formatValue(nextProps.value),
        });
    },

    formatValue(value) {
        return numeral(value).format('0.00a');
    },

    _validatePartialValue(value) {
        if (value === '') return true;
        if (/\d*\.$/.test(value)) return true;

        return false;
    },

    _checkLimits(value) {
        if (parseFloat(value) < this.state.min || parseFloat(value) > this.state.max) {
            return false;
        } else {
            return true;
        }
    },

    handleChange(event) {
        var value         = event.target.value.toString();
        var isValidNumber = /(^\d*\.\d*$)|(^\d*$)/.test(value);
        var isPartialValue = this._validatePartialValue(value);
        var isOutOfLimit  = !this._checkLimits(value);

        var error =  isPartialValue ? 'WRONG VALUE' : '';
        if (isValidNumber && isOutOfLimit) error = 'OUT OF LIMITS';

        if (isValidNumber || isPartialValue) {
            this.setState({
                value: value.toString(),
                error: error,
                formattedValue: this.formatValue(value),
            });
        }
    },

    handleBlur(event){
        var value = this.state.value ? this.state.value : '0';

        this.setState({
            focused: false,
            value: value,
        });

        if (this.props.onBlur) {
            if (this.props.dataMap) {
                this.props.onBlur({
                    newValue: value,
                    path: this.props.dataMap,
                    valueToSend: value
                });
            } else this.props.onBlur(event);
        }
    },

    handleFocus(){
        this.setState({
            focused: true,
        });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    },

    handleKeyDown(event){
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    },


    render() {
        var errorNode = this.state.error
            ? (<div className="animated fadeInUp">
                   <label className="WLC-warning-text WLC-error">{this.state.error}</label>
                   <div className="WLC-appendix WLC-error"></div>
               </div>)
            : '';

        var warningNode = this.state.warning
            ? (<div className="animated fadeInUp">
                  <label className="WLC-warning-text WLC-warning">{this.state.warning}</label>
                  <div className="WLC-appendix WLC-warning"></div>
               </div>)
            : '';

        var typeSign = '';

        if (this.props.type == 'percent')  typeSign = '%';
        if (this.props.type == 'currency') typeSign = this.props.currency.sign;

        var symbolNode = <span className="symbol">{typeSign}</span>;

        var inputClasses = cx({
            'WLC-focused': this.state.focused,
            'WLC-warning': this.state.warning,
            'WLC-error':   this.state.error,
        });

        var inputNode = <input ref       = "input"
                               style     = {this.props.style}
                               className = {inputClasses}
                               onChange  = {this.handleChange}
                               onFocus   = {this.handleFocus}
                               onBlur    = {this.handleBlur}
                               onKeyDown = {this.handleKeyDown}
                               data-map  = {this.props.dataMap}
                               data-name = {this.props.name}
                               disabled  = {this.props.disabled}
                               type      = {''}
                               value     = {this.state.focused
                                            ? this.state.value.toString()
                                            : this.state.formattedValue.toString()} />;

        return (
            <div className="WLC-NumericInput">
                {inputNode}
                {warningNode}
                {errorNode}
                {symbolNode}
            </div>

        );
    }
});

module.exports = NumericInput;