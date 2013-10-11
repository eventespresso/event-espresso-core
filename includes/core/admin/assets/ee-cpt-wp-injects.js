/**
 * injecting ee_admin_ajax into every ajaxSend call (cause wp can send some calls and we want to catch any of our filters!.
 */
jQuery(document).ajaxSend( function( e,x,a ) {
	s = 'get-comments';
	if ( typeof a.data !== 'undefined' && a.data.indexOf(s) > -1 ) {
		a.data += '&' + jQuery.param( {ee_admin_ajax : true} );
	}
});