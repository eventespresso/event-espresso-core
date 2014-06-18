/**
 * injecting ee_admin_ajax into every ajaxSend call (cause wp can send some calls and we want to catch any of our filters!.
 */
jQuery(document).ajaxSend( function( e,x,a ) {
	/**
	 * This injects ee_admin_ajax into any get-comments calls for our cpt routes.
	 */
	if ( typeof a.data !== 'undefined' && typeof a.data !== 'object' && a.data.indexOf('get-comments') > -1 ) {
		a.data += '&' + jQuery.param( {ee_admin_ajax : true} );
	}
});
