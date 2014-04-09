 jQuery(document).ready(function($) {
 	
	// Show debug info
	wp.heartbeat.debug = true;
	// set initial beat to fast
	wp.heartbeat.interval( 'fast' );
	wp.heartbeat.enqueue( 'espresso_thank_you_page', { 'reg_url_link' : eei18n.reg_url_link, 'server_time' : eei18n.server_time }, false );
 	
 	var loader = $('#espresso-ajax-loading');
 	$('#espresso-ajax-loading').remove();
	$('#ee-ajax-loading-pg').after( loader );
	$( loader ).css({ 'position' : 'relative', 'top' : '-5px', 'left' : 0, 'margin-left' : '.5em', 'font-size' : '18px', 'float' : 'left' }).show(); // , 'top' : '-.25em', 'left' : '.5em', 'margin-left' : '0', 'font-size' : '18px' 

	$(document).on( 'heartbeat-tick.espresso_thank_you_page', function( event, data ) {
		console.log( data.espresso_thank_you_page );
		if ( data.hasOwnProperty( 'espresso_thank_you_page' )) {
			if ( data.espresso_thank_you_page.hasOwnProperty( 'errors' )) {
				$('#espresso-thank-you-page-ajax-content-dv').hide().html( data.espresso_thank_you_page.errors ).slideDown(); 
				wp.heartbeat.dequeue( 'espresso_thank_you_page' );
			} else if ( data.espresso_thank_you_page.hasOwnProperty( 'still_waiting' )) {
				if ( data.espresso_thank_you_page.still_waiting > eei18n.IPN_wait_time ) {
					$('#espresso-thank-you-page-ajax-content-dv').hide().html( eei18n.slow_IPN ).slideDown();
					wp.heartbeat.dequeue( 'espresso_thank_you_page' );
				} else {
					var waitTime = new Date( null, null, null, null, null, data.espresso_thank_you_page.still_waiting ).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]
					$('#espresso-thank-you-page-ajax-time-dv').html( waitTime );
					wp.heartbeat.enqueue( 'espresso_thank_you_page', { 'reg_url_link' : eei18n.reg_url_link, 'server_time' : eei18n.server_time }, true );
				}
			} else {
				if ( data.espresso_thank_you_page.hasOwnProperty( 'transaction_details' ) && data.espresso_thank_you_page.hasOwnProperty( 'payment_details' )) {
					$('#espresso-thank-you-page-ajax-transaction-dv').hide().html( data.espresso_thank_you_page.transaction_details ).slideDown();
					$('#espresso-thank-you-page-ajax-payment-dv').hide().html( data.espresso_thank_you_page.payment_details ).slideDown();
					$('#espresso-thank-you-page-ajax-loading-dv').hide();
					wp.heartbeat.dequeue( 'espresso_thank_you_page' );
				}
			}

		} 
	});

});
