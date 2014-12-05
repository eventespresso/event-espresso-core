jQuery(document).ready(function($) {

	var EE_RECAPTCHA;

	/**
	 * @namespace EE_RECAPTCHA
	 * @type {{
		 *     recaptcha_div: object,
		 *     not_a_robot: boolean
	 * }}
	 * @namespace SPCO_response
	 * @type {{
		 *     recaptcha_passed: boolean
		 * }}
	 * @namespace eei18n
	 * @type {{
		 *     no_SPCO_error : string,
		 *     recaptcha_fail : string
		 * }}
	 */
	EE_RECAPTCHA = {

		recaptcha_div : $('#espresso-recaptcha-dv'),
		not_a_robot : false,



		/**
		 * @function initialize
		 */
		initialize : function() {

			// already passed ?
			if ( EE_RECAPTCHA.not_a_robot ) {
				return;
			}
			// ensure that the SPCO js class is loaded
			if ( typeof SPCO === 'undefined' ) {
				EE_RECAPTCHA.display_no_SPCO_error( eei18n.no_SPCO_error );
				return;
			}
			if ( EE_RECAPTCHA.recaptcha_div === 'undefined' || EE_RECAPTCHA.recaptcha_div.length === 0 ) {
				alert( 'NO recaptcha_div!' );
				return;
			}
			EE_RECAPTCHA.set_listener_for_SPCO_response();
		},



		/**
		 * @function set_listener_for_SPCO_response
		 */
		set_listener_for_SPCO_response : function() {
			// initialize if the SPCO reg step changes to "payment_options"
			SPCO.main_container.on( 'spco_process_response', function(  event, next_step, SPCO_response ) {
				//reset
				SPCO.override_messages = false;
				SPCO.reset_offset_from_top_modifier();
				EE_RECAPTCHA.process_SPCO_response( SPCO_response );
			});
		},



		/**
		 * @function process_SPCO_response
		 * @param  {object} SPCO_response
		 */
		process_SPCO_response : function( SPCO_response ) {
			//alert( 'process_SPCO_response' );
			//SPCO.console_log_object( 'SPCO_response', SPCO_response, 0 );
			if ( typeof SPCO_response.recaptcha_passed !== 'undefined' ) {
				if ( SPCO_response.recaptcha_passed ) {
					//alert( 'recaptcha passed' );
					// remove recaptcha
					EE_RECAPTCHA.recaptcha_div.html('');
					EE_RECAPTCHA.not_a_robot = true;
				} else {
					//alert( 'recaptcha failed' );
					EE_RECAPTCHA.display_error( SPCO.tag_message_for_debugging( 'EE_RECAPTCHA.passed() error', eei18n.recaptcha_fail ));
					//EE_RECAPTCHA.recaptcha_div.find('.rc-button-reload').trigger('click');
				}
			}
		},



		/**
		 * @function display_error
		 * @param  {string} msg
		 */
		display_error : function( msg ) {
			SPCO.offset_from_top_modifier = -450;
			SPCO.scroll_to_top_and_display_messages( EE_RECAPTCHA.recaptcha_div, SPCO.generate_message_object( '', msg, '' ));
			// prevent anyone else from removing our error message
			SPCO.override_messages = true;
		},



		/**
		 * @function display_no_SPCO_error
		 * @param  {string} msg
		 */
		display_no_SPCO_error : function( msg ) {
			// center notices on screen
			$('#espresso-ajax-notices').eeCenter( 'fixed' );
			// target parent container
			var espresso_ajax_msg = $('#espresso-ajax-notices-error');
			//  actual message container
			espresso_ajax_msg.children('.espresso-notices-msg').html( msg );
			// bye bye spinner
			$('#espresso-ajax-loading').fadeOut('fast');
			// display message
			espresso_ajax_msg.removeClass('hidden').show().delay( 10000 ).fadeOut();
		}



	};

	EE_RECAPTCHA.initialize();

});
