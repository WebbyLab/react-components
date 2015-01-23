/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

require('./LoadingAnimation.less');

var LoadingAnimation = React.createClass({
    render() {
        return (
            <div className="LoadingAnimation">
                <svg className="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        );
    }
});

module.exports = LoadingAnimation;