jQuery(document).ready(function($) {

	/**
	 * @namespace eei18n
	 * @type {{
	*     loading_payment_info: string,
	*     checking_for_new_payments: string,
	*     slow_IPN: string,
	*     server_error: string,
	*     TXN_complete: string,
	*     TXN_incomplete: string,
	*     e_reg_url_link: string,
	*     initial_access: string,
	*     IPN_wait_time: number,
	*     wp_debug: boolean,
	* }}
	 *  @namespace eeThnx
	 * @type {{
	 *     prev_txn_status: string,
	 *     data: object,
	 *     return: object,
	 *     spinner: object,
	 *     polling_time: string,
	 *     transaction_details: object,
	 * }}
	 *  @namespace data
	 * @type {{
	 *     espresso_thank_you_page: string,
	 *     errors: array,
	 *     return: object,
	 *     spinner: object,
	 *     polling_time: string,
	 *     transaction_details: object,
	 * }}
	 */

	// make sure eei18n is defined
	if ( typeof eei18n === 'undefined' ) {
		console.log( JSON.stringify( 'typeof eei18n === ' + undefined, null, 4 ) );
		eei18n = {
			loading_payment_info : "loading payment information...",
			checking_for_new_payments : "checking for new payments...",
			slow_IPN : '<div id="espresso-thank-you-page-slow-IPN-dv" class="ee-attention jst-left">The Payment Notification appears to be taking longer than usual to arrive. Maybe check back later or just wait for your payment and registration confirmation results to be sent to you via email. We apologize for any inconvenience this may have caused.</div>',
			server_error : "An unknown error occurred on the server while attempting to process your request. Please refresh the page and try again.",
			TXN_complete : "TCM",
			TXN_incomplete : "TIN",
			e_reg_url_link : "",
			initial_access : new Date().getTime(),
			IPN_wait_time : 1200,
			wp_debug : false
		};
	}

	var eeThnx = {


		// set current TXN's status
		prev_txn_status: '',
		// data object sent from the server
		data: {
			'espresso_thank_you_page' : null,
			'errors' : null,
			'still_waiting' : null,
			'new_payments' : null,
			'transaction_details' : null,
			'payment_details' : null
		},
		// JSON data to be sent to the server when polling
		return : {
			'e_reg_url_link' : eei18n.e_reg_url_link,
			'initial_access' : eei18n.initial_access,
			'txn_status' : this.prev_txn_status,
			'get_payments_since' : 0
		},
		// polling_time
		polling_time: 5,
		// #espresso-thank-you-page-ajax-content-dv
		ajax_content_dv : {},
		//  #espresso-thank-you-page-ajax-transaction-dv
		transaction_details_dv : {},
		// ajax notices DOM element
		ajax_notices : {},
		// ajax success notices DOM element
		ajax_success_notices : {},
		// ajax error notices DOM element
		ajax_error_notices : {},
		// ajax loading animation DOM element
		ajax_loading : {},
		// copy of  ajax_loading
		spinner : {},


		/**
		*	init
		*/
		init : function() {
			//eeThnx.console_log( 'init' );
			eeThnx.ajax_content_dv = $( '#espresso-thank-you-page-ajax-content-dv' );
			eeThnx.transaction_details_dv = $( '#espresso-thank-you-page-ajax-transaction-dv' );
			eeThnx.ajax_notices = $( '#espresso-ajax-notices' );
			eeThnx.ajax_success_notices = $( '#espresso-ajax-notices-success' );
			eeThnx.ajax_error_notices = $( '#espresso-ajax-notices-error' );
			eeThnx.ajax_loading = $( '#espresso-ajax-loading' );
			eeThnx.setup_listener_for_heartbeat();
			eeThnx.setup_listener_for_resend_reg_confirmation();
			eeThnx.display_spinner();
			eeThnx.set_up_wp_heartbeat();
			//eei18n.wp_debug = 0;
		},


		/**
		 *    setup_listener_for_heartbeat
		 */
		setup_listener_for_heartbeat: function () {
			//eeThnx.console_log( 'setup_listener_for_heartbeat' );
			// setup listener
			$( document ).on( 'heartbeat-tick', function( event, data ) {
				//eeThnx.console_log( 'heartbeat-tick' );
				if ( typeof data[ 'espresso_thank_you_page' ] === 'undefined' ) {
					return;
				}
				eeThnx.process_heartbeat_response( data );
			} );
		},


		/**
		 *    setup_listener_for_resend_reg_confirmation
		 */
		setup_listener_for_resend_reg_confirmation : function() {
			//eeThnx.console_log( 'setup_listener_for_resend_reg_confirmation' );
			$( '.ee-registrations-list tbody' ).on( 'click', '.ee-resend-reg-confirmation-email', function( e ) {
				e.preventDefault();
				e.stopPropagation();
				eeThnx.resend_reg_confirmation_email( $( this ).attr( 'rel' ) );
			} );
		},



		/**
		 *    display_spinner
		 */
		display_spinner: function () {
			//eeThnx.console_log('display_spinner');
			eeThnx.spinner = eeThnx.ajax_loading.clone().attr('id', 'ee-thank-you-page-ajax-loading');
//			eeThnx.ajax_loading.remove();
			$('#ee-ajax-loading-dv').after(eeThnx.spinner);
			$(eeThnx.spinner).css({ 'position': 'relative', 'top': '-5px', 'left': 0, 'margin-left': '.5em', 'font-size': '18px', 'float': 'left' }).show();
		},

		/**
		 *    set_up_wp_heartbeat
		 */
		set_up_wp_heartbeat: function () {
			//eeThnx.console_log('set_up_wp_heartbeat');
			// Show debug info ?
			wp.heartbeat.debug = eei18n.wp_debug === '1';
			// set initial beat to fast
			wp.heartbeat.interval( eeThnx.polling_time );
			wp.heartbeat.enqueue( 'espresso_thank_you_page', eeThnx.return, false );
			wp.heartbeat.connectNow();
			// slow down polling after initial check
			eeThnx.polling_time = 15;
		},

		/**
		 *    process_heartbeat_response
		 */
		process_heartbeat_response: function (data) {
			//eeThnx.console_log('process_heartbeat_response');
			// check heartbeat for thank you page data
			if ( typeof data.espresso_thank_you_page === 'undefined' || data.espresso_thank_you_page === null ) {
				//eeThnx.console_log('espresso_thank_you_page undefined');
				eeThnx.stop_heartbeat();
				return;
			}
			// store it
			eeThnx.data = data.espresso_thank_you_page;
			// and log to console if debugging
			//eeThnx.console_log_obj( 'eeThnx.data', eeThnx.data );
			// set return txn status to incoming txn status
			if ( typeof eeThnx.data.txn_status !== 'undefined' ) {
				eeThnx.return.txn_status = eeThnx.data.txn_status;
			}
			// set return get_payments_since to incoming get_payments_since which
			if ( typeof eeThnx.data.get_payments_since !== 'undefined' ) {
				eeThnx.return.get_payments_since = eeThnx.data.get_payments_since;
			}
			// handle errors
			if ( typeof eeThnx.data.errors !== 'undefined' ) {
				//eeThnx.console_log( 'typeof eeThnx.data.errors !== undefined' );
				eeThnx.display_errors(eeThnx.data.errors);
				eeThnx.stop_heartbeat();
			// slow IPN
			} else if ( typeof eeThnx.data.still_waiting !== 'undefined' ) {
				//eeThnx.console_log( 'typeof eeThnx.data.still_waiting !== undefined' );
				eeThnx.process_wait_time();
				// server sent back data
			} else {
				eeThnx.process_server_data();
			}
		},

		/**
		 *    process_wait_time
		 */
		process_wait_time: function () {
			//eeThnx.console_log( 'process_wait_time' );
			//eeThnx.console_log( 'eeThnx.data.still_waiting', eeThnx.data.still_waiting );
			//eeThnx.console_log( 'eei18n.IPN_wait_time', eei18n.IPN_wait_time );
			// has wait time exceeded exceptable limit?
			if ( eeThnx.data.still_waiting > eei18n.IPN_wait_time ) {
				// waited too long
				eeThnx.wait_time_exceeded();
				eeThnx.stop_heartbeat();
			} else {
				// keep waiting
				eeThnx.set_wait_time();
				eeThnx.restart_heartbeat();
			}
		},

		/**
		 *    process_server_data
		 */
		process_server_data: function () {
			//eeThnx.console_log('process_server_data');
			// received new payments AND updated transaction ?
			if (typeof eeThnx.data.new_payments !== 'undefined') {
				//eeThnx.console_log( 'new_payments' );
				eeThnx.update_transaction_details();
				eeThnx.display_new_payments();
				eeThnx.start_stop_heartbeat();
				// slow down polling
				eeThnx.polling_time = 60;
				// received transaction AND payment details ?
			} else if (typeof eeThnx.data.transaction_details !== 'undefined' && typeof eeThnx.data.payment_details !== 'undefined') {
				//eeThnx.console_log( 'transaction_details && payment_details' );
				eeThnx.display_transaction_details();
				eeThnx.display_payment_details();
				eeThnx.hide_loading_message();
				eeThnx.start_stop_heartbeat();
				// slow down polling
				eeThnx.polling_time = 60;
				// received transaction details only ?
			} else if (typeof eeThnx.data.transaction_details !== 'undefined') {
				//eeThnx.console_log( 'transaction_details' );
				eeThnx.display_transaction_details();
				eeThnx.update_loading_message();
				eeThnx.start_stop_heartbeat();
				// slow down polling
				eeThnx.polling_time = 60;
				// received payment details
			} else if (typeof eeThnx.data.payment_details !== 'undefined') {
				//eeThnx.console_log( 'payment_details' );
				eeThnx.display_payment_details();
				eeThnx.hide_loading_message();
				eeThnx.start_stop_heartbeat();
				// slow down polling
				eeThnx.polling_time = 60;
			} else {
				//eeThnx.console_log( 'start_stop_heartbeat' );
				eeThnx.start_stop_heartbeat();
			}
		},

		/**
		 *    display_errors
		 */
		display_errors: function () {
			//eeThnx.console_log('display_errors');
			eeThnx.ajax_content_dv.hide().html(eeThnx.errors).slideDown();
		},

		/**
		 *    display_transaction_details
		 */
		display_transaction_details: function () {
			//eeThnx.console_log('display_transaction_details');
			if ( eeThnx.transaction_details_dv.length > 0 ) {
				eeThnx.transaction_details_dv.hide().html( eeThnx.data.transaction_details ).slideDown();
			}
			// has the TXN status changed ?
			if (eeThnx.return.txn_status !== eeThnx.prev_txn_status) {
				eeThnx.prev_txn_status = eeThnx.return.txn_status;
			}
		},

		/**
		 *    update_transaction_details
		 */
		update_transaction_details: function () {
			//eeThnx.console_log('update_transaction_details');
			eeThnx.transaction_details_dv.html(eeThnx.data.transaction_details);
			// has the TXN status changed ?
			if ( eeThnx.return.txn_status !== eeThnx.prev_txn_status ) {
				eeThnx.prev_txn_status = eeThnx.return.txn_status;
			}
		},

		/**
		 *    display_payment_details
		 */
		display_payment_details: function () {
			//eeThnx.console_log('display_payment_details');
			$('#espresso-thank-you-page-ajax-payment-dv').hide().html(eeThnx.data.payment_details).slideDown();
		},

		/**
		 *    display_new_payments
		 */
		display_new_payments: function () {
			//eeThnx.console_log('display_new_payments');
			$('#espresso-thank-you-page-payment-details-dv').find('tbody').append(eeThnx.data.new_payments);
		},

		/**
		 *    update_loading_message
		 */
		update_loading_message: function () {
			//eeThnx.console_log('update_loading_message');
			$('#ee-ajax-loading-msg-spn').html(eei18n.loading_payment_info);
		},

		/**
		 *    hide_loading_message
		 */
		hide_loading_message: function () {
			//eeThnx.console_log('hide_loading_message');
			$('#espresso-thank-you-page-ajax-loading-dv').hide();
		},

		/**
		*	checking_for_new_payments_message
		*/
//		checking_for_new_payments_message : function() {
//			eeThnx.console_log( 'checking_for_new_payments_message' );
//			$('#ee-ajax-loading-pg').hide();
//			$('#ee-ajax-loading-dv').removeClass('lt-blue-text').addClass('lt-grey-text');
////			var since = new Date( null, null, null, null, null, eeThnx.data.get_payments_since ).toTimeString();   + ' ' + since
//			$('#ee-ajax-loading-msg-spn').html( eei18n.checking_for_new_payments );
//			eeThnx.ajax_loading.css({ 'font-size' : '12px', 'top' : 0 }).addClass('lt-grey-text');
//			$('#espresso-thank-you-page-ajax-loading-dv').hide(0).addClass('small-text').delay( ( eeThnx.polling_time - 1 ) * 1000 ).show(0);
//		},

		/**
		*	set_wait_time
		*/
		set_wait_time : function() {
			//eeThnx.console_log( 'set_wait_time' );
			var waitTime = new Date( null, null, null, null, null, eeThnx.data.still_waiting ).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0];
			//eeThnx.console_log( 'waitTime', waitTime );
			$('#espresso-thank-you-page-ajax-time-dv').html( waitTime );
		},

		/**
		*	wait_time_exceeded
		*/
		wait_time_exceeded : function() {
			//eeThnx.console_log( 'wait_time_exceeded' );
			eeThnx.ajax_content_dv.hide().html( eei18n.slow_IPN ).slideDown();
		},

		/**
		*	start_stop_heartbeat
		*/
		start_stop_heartbeat : function() {
			//eeThnx.console_log( 'start_stop_heartbeat' );
			//eeThnx.console_log( 'eeThnx.return.txn_status', eeThnx.return.txn_status );
			//eeThnx.console_log( 'eei18n.TXN_incomplete', eei18n.TXN_incomplete );
			if (eeThnx.return.txn_status === eei18n.TXN_incomplete) {
				eeThnx.restart_heartbeat();
//				eeThnx.checking_for_new_payments_message();
			} else {
				eeThnx.stop_heartbeat();
				eeThnx.hide_loading_message();
			}
		},

		/**
		 *    restart_heartbeat
		 */
		restart_heartbeat: function () {
			//eeThnx.console_log('restart_heartbeat');
			wp.heartbeat.enqueue('espresso_thank_you_page', eeThnx.return, true);
		},

		/**
		 *    stop_heartbeat
		 */
		stop_heartbeat: function () {
			//eeThnx.console_log('stop_heartbeat');
			wp.heartbeat.dequeue('espresso_thank_you_page');
		},

		/**
		 *    resend_reg_confirmation_email
		 */
		resend_reg_confirmation_email: function ( token ) {

			$.ajax({
				type: "POST",
				url: eei18n.ajax_url,
				data: {
					action : "espresso_resend_reg_confirmation_email",
					token : token,
					ee_front_ajax : 1
				},
				dataType: "json",

				beforeSend: function() {
					eeThnx.ajax_loading.eeCenter( 'fixed' ).show();
				},

				success: function( response ){
					if ( typeof response.success !== 'undefined' && response.success !== '' ) {
						eeThnx.show_ajax_success_msg( response.success );
					} else {
						// uh-oh spaghettios!
						if ( typeof response.errors !== 'undefined' && response.errors !== '' ) {
							eeThnx.show_ajax_error_msg( response.errors );
						} else {
							eeThnx.show_ajax_error_msg( eei18n.server_error );
						}
					}
				},

				error: function() {
					eeThnx.show_ajax_error_msg( eei18n.server_error );
				}

			});

		},

		/**
		 *    show ajax success msg
		 * @param success_msg
		 * @param fadeOut
		 */
		show_ajax_success_msg : function( success_msg, fadeOut ) {
			// make sure fade out time is not too short
			fadeOut = typeof fadeOut === 'undefined' || fadeOut < 4000 ? 4000 : fadeOut;
			// does an actual message exist ?
			if ( typeof success_msg !== 'undefined' && success_msg !== '' )  {
				eeThnx.ajax_notices.eeCenter( 'fixed' );
				eeThnx.ajax_success_notices.find('> .espresso-notices-msg').html( success_msg );
				eeThnx.ajax_loading.fadeOut('fast');
				eeThnx.ajax_success_notices.removeClass('hidden').show().delay(fadeOut).fadeOut();
			} else {
				eeThnx.ajax_loading.fadeOut('fast');
			}
		},

		/**
		 *    show ajax error msg
		 * @param error_msg
		 * @param fadeOut
		 */
		show_ajax_error_msg : function( error_msg, fadeOut ) {
			// make sure fade out time is not too short
			fadeOut = typeof fadeOut === 'undefined' || fadeOut < 10000 ? 10000 : fadeOut;
			// does an actual message exist ?
			if ( typeof error_msg !== 'undefined' && error_msg !== '' ) {
				eeThnx.ajax_notices.eeCenter( 'fixed' );
				eeThnx.ajax_error_notices.find('> .espresso-notices-msg').html( error_msg );
				eeThnx.ajax_loading.fadeOut('fast');
				eeThnx.ajax_error_notices.removeClass('hidden').show().delay(fadeOut).fadeOut();
			} else {
				eeThnx.ajax_loading.fadeOut('fast');
			}
		},

		/**
		 *    console_log
		 */
		console_log: function (key, value) {
			if (eei18n.wp_debug && typeof key !== 'undefined' && typeof value !== 'undefined') {
				console.log(JSON.stringify(key + ': ' + value, null, 4));
			} else if (eei18n.wp_debug && typeof key !== 'undefined') {
				console.log(key);
			}
		},

		/**
		 *    console_log_obj
		 */
		console_log_obj: function (obj_name, obj) {
			if (eei18n.wp_debug && typeof obj_name !== 'undefined') {
				console.log(JSON.stringify(obj_name, null, 4));
			}
			if (eei18n.wp_debug && typeof obj !== 'undefined') {
				for (var key in obj) {
					if ( typeof key !== 'undefined' && typeof obj[ key ] !== 'undefined') {
						console.log(JSON.stringify('    ' + key + ': ' + obj[ key ], null, 4));
				}
				}
			}
		}

	};
	// end of eeThnx object

	// initialize
	eeThnx.init();

});
