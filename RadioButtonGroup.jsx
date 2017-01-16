var React = require('react/addons');
var cx = React.addons.classSet;
var FaIcon = require('./FaIcon.jsx');

require('./RadioButtonGroup.less');

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

        this.props.onChange(id);
    },

    renderSingleBtn(btn) {
        var isActive = this.state.activeId === btn.id;

        var rectangleClass = cx({
            'WLC-active': isActive,
            'WLC-RadioBtnWithLabel': true,
        });

        var labelNode = btn.label
            ? <span onTouchTap={this.handleClick.bind(this, btn.id)}>{btn.label}</span>
            : '';

        if (this.props.display === 'rectangle') return (
            <div className={rectangleClass} key={btn.id} onTouchTap={this.handleClick.bind(this, btn.id)}>
                {labelNode}
            </div>
        );
        return (
            <div className='WLC-RadioBtnWithLabel' key={btn.id}>
                <FaIcon type={(btn.icon).toLowerCase()}
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
            'WLC-RadioButtonGroup': true,
            'WLC-disabled': this.props.disabled,
            'WLC-rectangle': this.props.display === 'rectangle',
        });

        return (
            <div className={rootClass}>
                {radioButtonsNode}
            </div>
        );
    }
});

module.exports = RadioButtonGroup;