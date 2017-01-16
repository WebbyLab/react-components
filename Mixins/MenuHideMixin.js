'use strict';

let MenuHideMixin = {
    handleBodyClick(e) {
        let targetNode = e.target;
        let isNotChild = $(this.refs.menu.getDOMNode()).has(targetNode).length === 0;

         if (isNotChild && this.state.isMenuVisible) {
             this.handleMenuHide();
         }
    },

    componentDidMount() {
        document.querySelector('body').addEventListener('click', this.handleBodyClick);
    },

    componentWillUnmount() {
        document.querySelector('body').removeEventListener('click', this.handleBodyClick);
    },
};

module.exports = MenuHideMixin;
