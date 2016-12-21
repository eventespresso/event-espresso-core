(function(window, undefined){
    'use strict';
    window.eejs = window.eejs || {};
    eejs.data = eejs.data || {};

    /**
     * use this for eejs exceptions
     * Usage: throw new eejs.exception('some message')
     */
    eejs.exception = function( msg ) {
        this.msg = msg;
    }
})(window);