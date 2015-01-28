/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var cx = React.addons.classSet;

require('./Flag.less');

var Flag = React.createClass({
    render() {
        var country = this.props.country;

        var countryClass = cx({
            'Flag': true,
            'DE': country === 'DE',
            'FR': country === 'FR',
            'ES': country === 'ES',
            'IT': country === 'IT',
            'UK': country === 'UK',
            'US': country === 'US',
            'CA': country === 'CA',
            'NL': country === 'NL',
            'CN': country === 'CN'
        });
        return (
            <i className={countryClass}></i>
        );
    }

});

module.exports = Flag;