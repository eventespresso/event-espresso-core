 jQuery(document).ready(function($) {
 	
	// Show debug info
	wp.heartbeat.debug = true;
	// set initial beat to fast
	wp.heartbeat.interval( 'fast' );
//	var thnx_data = { 'reg_url_link' : eei18n.reg_url_link };
//	console.log( thnx_data );
	wp.heartbeat.enqueue( 'espresso_thank_you_page', { 'reg_url_link' : eei18n.reg_url_link }, false );	
 	
 	var loader = $('#espresso-ajax-loading');
 	$('#espresso-ajax-loading').remove();
	$('#espresso-thank-you-page-ajax-loading-dv p').before( loader );
	$( loader ).css({ 'position' : 'relative', 'top' : '-5px', 'left' : 0, 'margin-left' : '.5em', 'font-size' : '18px', 'float' : 'left' }).show(); // , 'top' : '-.25em', 'left' : '.5em', 'margin-left' : '0', 'font-size' : '18px' 

	$(document).on( 'heartbeat-tick.espresso_thank_you_page', function( event, data ) {
		alert('check console');
		console.log( data.espresso_thank_you_page );
		if ( data.hasOwnProperty( 'espresso_thank_you_page' )) {
			if ( data.espresso_thank_you_page.hasOwnProperty( 'errors' )) {
				$('#espresso-thank-you-page-ajax-content-dv').hide().html( data.espresso_thank_you_page.errors ).slideDown();
			} else if ( data.espresso_thank_you_page.hasOwnProperty( 'still_waiting' )) {
				$('#espresso-thank-you-page-ajax-time-dv').hide().html().slideDown();
			} else {
				if ( data.espresso_thank_you_page.hasOwnProperty( 'transaction_details' )) {
					$('#espresso-thank-you-page-ajax-transaction-dv').hide().html( data.espresso_thank_you_page.transaction_details ).slideDown();
				}
				if ( data.espresso_thank_you_page.hasOwnProperty( 'payment_details' )) {
					$('#espresso-thank-you-page-ajax-payment-dv').hide().html( data.espresso_thank_you_page.payment_details ).slideDown();
				}
				$('#espresso-thank-you-page-ajax-loading-dv').hide();
			}

		} 
	});
	
	console.log( 'end of JS file' );

});
