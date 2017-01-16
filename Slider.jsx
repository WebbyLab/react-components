var React = require('react/addons');
var cx = React.addons.classSet;

require('./Slider.less');

var Slider = React.createClass({
    propTypes: {
        disabled: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },

    getInitialState() {
        return {
            value: this.props.value ? this.props.value : 0,
            min: this.props.min ? this.props.min : 0,
            max: this.props.max ? this.props.max : 10,
            fillWidth : '0',
        };
    },

    componentDidMount() {
        var fillValue = this.state.value > this.state.max ? this.state.max : this.state.value;

        this.setState({
            fillWidth: this.setSliderFill(fillValue),
        });
    },

    setSliderFill(value) {
        var fillPercent = (value - this.state.min) / (this.state.max - this.state.min);
        var fillFixPercent  = fillPercent / 11; // Fix fill that overlaps slider thumb
        var sliderWidth = getComputedStyle(this.getDOMNode()).width;

        return (fillPercent-fillFixPercent)*parseInt(sliderWidth);
    },

    componentWillReceiveProps(nextProps) {
        var value = nextProps.value;
        var min   = nextProps.min;
        var max   = nextProps.max;

        if (value < min) value = min;
        if (value > max) value = max;

        this.setState({
            min: min,
            max: max,
            value: value,
            fillWidth: this.setSliderFill(value),
        });
    },

    handleChange(event) {
        var value = event.target.value;

        if (this.props.onChange) {
            if (this.props.dataMap) {
                this.props.onChange({newValue:value, path:this.props.dataMap, valueToSend:this.formatBeforeSend(value)});
            } else this.props.onChange(value);
        }
    },

    formatBeforeSend(val) {
        if (this.props.type === 'percent') {
            return parseFloat(val / 100);
        }

        return parseFloat(val);
    },

    render() {
        var fillStyle = {
            width: this.state.fillWidth,
        };

        var fillClass = cx({
            'WLC-slider-fill': true,
            'WLC-disabled': this.props.disabled
        });

        var labelNode = this.props.label ? <span className='WLC-sub-label'>{this.props.label}</span> : '';

        return (
            <div className='WLC-Slider'>
                <div className='WLC-track' />
                <input type     = 'range'
                       ref      = 'input'
                       disabled = {this.props.disabled}
                       onChange = {this.handleChange}
                       step     = {this.props.step}
                       value    = {this.state.value}
                       min      = {this.state.min}
                       max      = {this.state.max} />
                <div className={fillClass} style={fillStyle} />
                {labelNode}
            </div>
        );
    }
});

module.exports = Slider;
