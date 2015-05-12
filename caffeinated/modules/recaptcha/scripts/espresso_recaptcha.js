var EE_RECAPTCHA;

jQuery(document).ready(function($) {

	/**
	 * @namespace EE_RECAPTCHA
	 * @type {{
		 *     recaptcha_div: object,
		 *     not_a_robot: boolean
	 * }}
	 * @namespace SPCO_response
	 * @type {{
		 *     recaptcha_passed: boolean,
		 *     bypass_recaptcha: boolean
		 * }}
	 * @namespace eei18n
	 * @type {{
		 *     no_SPCO_error : string,
		 *     no_recaptcha_error : string,
		 *     recaptcha_fail : string
		 * }}
	 */
	EE_RECAPTCHA = {

		recaptcha_div : $('#espresso-recaptcha-dv'),
		submitted : false,
		not_a_robot : false,



		/**
		 * @function initialize
		 */
		initialize : function() {

			// already passed ?
			if ( EE_RECAPTCHA.not_a_robot ) {
				SPCO.get_next_step = true;
				return;
			}
			// ensure that the SPCO js class is loaded
			if ( typeof SPCO === 'undefined' ) {
				// if WP_DEBUG is on, then display an error
				if ( eei18n.wp_debug ) {
					EE_RECAPTCHA.display_no_SPCO_error( eei18n.no_SPCO_error );
				}
				return;
			}
			// ensure that the proper html markup exists
			if ( EE_RECAPTCHA.recaptcha_div === 'undefined' || EE_RECAPTCHA.recaptcha_div.length === 0 ) {
				// if WP_DEBUG is on, then display an error
				if ( eei18n.wp_debug ) {
					var msg = SPCO.tag_message_for_debugging( 'EE_RECAPTCHA.initialize() error', eei18n.no_recaptcha_error );
					SPCO.scroll_to_top_and_display_messages( SPCO.main_container, SPCO.generate_message_object( '', msg, '' ), true );
				}
				return;
			}
			EE_RECAPTCHA.set_listener_for_SPCO_process_next_step_button_click();
			EE_RECAPTCHA.set_listener_for_SPCO_response();
		},



		/**
		 * @function set_listener_for_SPCO_process_next_step_button_click
		 */
		set_listener_for_SPCO_process_next_step_button_click : function() {
			// initialize if the SPCO reg step changes to "payment_options"
			SPCO.main_container.on( 'process_next_step_button_click', function()  {
				if ( ! EE_RECAPTCHA.submitted ) {
					SPCO.form_is_valid = false;
					eei18n.ajax_submit = true;
					SPCO.override_messages = false;
					SPCO.reset_offset_from_top_modifier();
					EE_RECAPTCHA.display_error( SPCO.tag_message_for_debugging( 'EE_RECAPTCHA.process_next_step_button_click() error', eei18n.recaptcha_fail ) );
				} else {
					eei18n.ajax_submit = EE_RECAPTCHA.not_a_robot;
				}
			});
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
				// bypass recaptcha ?
				if ( SPCO_response.bypass_recaptcha ) {
					//  you're still a robot
					EE_RECAPTCHA.not_a_robot = false;
				} else if ( SPCO_response.recaptcha_passed ) {
					// remove recaptcha
					EE_RECAPTCHA.recaptcha_div.html('');
					EE_RECAPTCHA.not_a_robot = true;
					SPCO.get_next_step = true;
				} else {
					// do NOT pass go! do NOT collect $200
					SPCO.get_next_step = false;
					//alert( 'recaptcha failed' );
					EE_RECAPTCHA.display_error( SPCO.tag_message_for_debugging( 'EE_RECAPTCHA.passed() error', eei18n.recaptcha_fail ));
				}
			}
		},



		/**
		 * @function display_error
		 * @param  {string} msg
		 */
		display_error : function( msg ) {
			SPCO.offset_from_top_modifier = -450;
			SPCO.scroll_to_top_and_display_messages( EE_RECAPTCHA.recaptcha_div, SPCO.generate_message_object( '', msg, '' ), true );
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



/**
 * @function espresso_recaptcha_verification
 * @param  {string} response
 */
var espresso_recaptcha_verification = function( response ) {
	jQuery(document).ready(function($) {
		if ( typeof response !== 'undefined' && response !== '' && typeof SPCO.additional_post_data !== 'undefined' && SPCO.additional_post_data.indexOf( 'g-recaptcha-response' ) === -1 ) {
			SPCO.additional_post_data = '&g-recaptcha-response=' + response;
			$( '<input>' ).attr(
				{
					type : 'hidden',
					id : 'process_form_submission',
					name : 'process_form_submission',
					value : true
				}
			).appendTo( SPCO.main_container.find('form') );
			EE_RECAPTCHA.submitted = true;
		}
	});
};

