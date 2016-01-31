

'use strict';

var React = require('react');

require('./MainMenu.less');

var MainMenu = React.createClass({
    _handleWrapperClick() {
        this.props.onClose();
    },

    render() {
        return (
            <div className="WLC-Menu">
                <div className="WLC-menu-wrapper" onTouchTap={this._handleWrapperClick}>
                    <div className="WLC-menu-content animated fadeInDown">
                        <ul>
                            {this.props.children}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = MainMenu;