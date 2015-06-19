/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var cx = require('react-classset');

require('./Flag.less');

var Flag = React.createClass({

    propTypes: {
        // country: React.propTypes.string.isRequired
    },

    render() {
        var country = this.props.country;

        var countryClass = cx({
            'Flag': true,
            "US": country === "US",
            "CA": country === "CA",
            "MX": country === "MX",
            "PE": country === "PE",
            "AR": country === "AR",
            "CL": country === "CL",
            "CO": country === "CO",
            "CR": country === "CR",
            "GT": country === "GT",
            "TT": country === "TT",
            "UK": country === "UK",
            "FR": country === "FR",
            "NL": country === "NL",
            "SE": country === "SE",
            "FI": country === "FI",
            "ES": country === "ES",
            "IT": country === "IT",
            "HU": country === "HU",
            "PL": country === "PL",
            "PT": country === "PT",
            "GR": country === "GR",
            "JP": country === "JP",
            "TW": country === "TW",
            "KR": country === "KR",
            "TH": country === "TH",
            "AU": country === "AU",
            "NZ": country === "NZ"
        });
        return (
            <i className={countryClass}></i>
        );
    }

});

module.exports = Flag;