/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var cx = React.addons.classSet;

require('./Menu.less');

var Menu = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        items: React.PropTypes.array.isRequired,
        checkedId: React.PropTypes.string.isRequired,
    },

    handleChange(id) {
        if (this.props.onChange) {
            this.props.onChange(id);
        }
    },

    render() {
        var rootClass = cx({
            'WLC-Menu': true
        });

        var index = this.props.items.findIndex( item => item.id === this.props.checkedId );
        return (
            <div className={rootClass + ' WLC-total-' + this.props.items.length}>
                <div className={'WLC-caret WLC-num-'+index}>
                    <div className='WLC-caret-inner' />
                </div>

                <div className='WLC-options'>
                    { this.props.items.map(item => {
                        var optClass = cx({
                            'WLC-option': true,
                            'WLC-checked': item.id == this.props.checkedId
                        });

                        return (
                            <div key={item.id}
                                 className={optClass}
                                 onTouchTap={this.handleChange.bind(this, item.id)}
                                 onClick={this.handleChange.bind(this, item.id)}>
                                <span>{item.label}</span>
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }
});

module.exports = Menu;

/*===================================
=               How to:             =
===================================*/
//
// <Menu onChange={this.handleMenuChange}
//       checkedId='{this.state.menuVal}'
//       items={[{
//           id: 'option1',
//           label: 'option1'
//       }, {
//           id: 'option2',
//           label: 'option2'
//       }, {
//           id: 'option3',
//           label: 'option3'
//       }]} />
//