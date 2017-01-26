var SPCO;
jQuery(document).ready( function($) {

	/**
	* @namespace SPCO
	* @type {{
	*     main_container: object,
	*     methods_of_payment: object,
	*     current_form_to_validate: object,
	*     form_inputs: object,
	*     additional_post_data: string,
	*     require_values: object,
	*     multi_inputs_that_do_not_require_values: object,
	*     success_msgs: object,
	*     error_msgs: object,
	*     offset_from_top: number,
	*     offset_from_top_modifier: number,
	*     display_debug: number,
	*     allow_enable_submit_buttons: boolean,
	*     allow_submit_reg_form: boolean,
	*     override_messages: boolean,
	*     get_next_step: boolean,
	*     form_is_valid: boolean
	* }}
	* @namespace eei18n
	* @type {{
	*  		ajax_url: string,
	* 		reg_steps: object,
	*     reg_step_error: string,
	*     server_error: string,
	*     validation_error: string,
	*     invalid_coupon: string,
	*     required_field: string,
	*     required_multi_field: string,
	*     answer_required_questions: string,
	*     attendee_info_copied: string,
	*     attendee_info_copy_error: string,
	*     enter_valid_email: string,
	*     valid_email_and_questions: string,
	*     no_payment_method: string,
	*     invalid_payment_method: string,
	*     invalid_json_response: string,
	*     forwarding_to_offsite: string,
	*     process_registration: string,
	*     language: string,
	*     EESID: string,
	*     datepicker_yearRange: string,
	*     revisit: string,
	*     e_reg_url_link: string,
	*     timer_years: string,
	*     timer_months: string,
	*     timer_weeks: string,
	*     timer_days: string,
	*     timer_hours: string,
	*     timer_minutes: string,
	*     timer_seconds: string,
	*     timer_year: string,
	*     timer_month: string,
	*     timer_week: string,
	*     timer_day: string,
	*     timer_hour: string,
	*     timer_minute: string,
	*     timer_second: string,
	*     registration_expiration_notice: string,
	*     ajax_submit: boolean,
	*     empty_cart: boolean,
	*     session_extension: number,
	*     session_expiration: number,
	*  }}
	* @namespace response
	* @type {{
	*     inner_key: string,
	*     outer_key: string,
	*     recaptcha_passed: boolean,
	*     recaptcha_reload: boolean,
	*     reg_step_html: string,
	*     return_data: object
	*     billing_form_rules: object
	*     payment_method: string
	*     payment_method_info: string
	*     redirect_form: string
	*     redirect_url: string
	*     plz_select_method_of_payment: string
	* }}
	* @namespace ee_form_section_vars
	* @type {{
	*     form_data: object,
	*     form_section_id: string,
	*     validation_rules: object
	*     errors: object
	*     required: boolean
	*     localized_error_messages: object
	*     validUrl: string
	* }}
	*  @namespace EEFV
	*  @type object
	*/
	SPCO = {

		// main SPCO div
		main_container : $('#ee-single-page-checkout-dv'),
		// #methods-of-payment div
		methods_of_payment : null,
		// depending on what step is in progress, this is the current form
		current_form_to_validate : null,
		// all form inputs within the SPCO main_container
		form_inputs : null,
		// string of key value pairs like "&foo=bar" to get appended to outgoing AJAX data
		additional_post_data : null,
		// array of input fields that require values
		require_values : [],
		// array of multi-value inputs (checkboxes and radio buttons) that do NOT require values
		multi_inputs_that_do_not_require_values : [],
		// success message array
		success_msgs : [],
		// error message array
		error_msgs : [],
		// form system custom error message array
		invalid_input_errors : [],
		// pixel position from top of form to scroll to after errors
		offset_from_top : 0,
		// modifier for offset_from_top
		offset_from_top_modifier : -50,
		// the first invalid input in a form
		invalid_input_to_scroll_to : {},
		// display debugging info in console?
		display_debug : eei18n.wp_debug,
		// allow submit buttons to be enabled?
		allow_enable_submit_buttons : true,
		// allow reg form to be submitted?
		allow_submit_reg_form : true,
		// override SPCO messages
		override_messages : false,
		// whether or not to proceed to the next step
		get_next_step : true,
		// whether form has been validated successfully
		form_is_valid : false,
		// amount to be paid during this TXN
		payment_amount : 0,
		// container for displaying how much time is left to complete registration
		registration_time_limit : $( '#spco-registration-time-limit-spn' ),
		// timestamp for when the session expires
		//registration_session_expiration : new Date( Date.parse( $( '#spco-registration-expiration-spn' ).html() ) ),
		registration_session_expiration : new Date( Date.parse( eei18n.session_expiration ) ),
		// AJAX notice fadeout times
		notice_fadeout_success : 6000,
		notice_fadeout_attention : 18000,
		notice_fadeout_errors : 12000,
		notice_fadeout_min : 4000,



	/********** INITIAL SETUP **********/



		/**
		 * @function initialize
		 */
		initialize : function() {
			if ( typeof eei18n !== 'undefined' ) {
				SPCO.form_inputs = SPCO.main_container.find( ':input' );
				SPCO.disable_caching();
				SPCO.set_validation_defaults();
				SPCO.initialize_form_validation();
				SPCO.uncheck_copy_option_inputs();
				SPCO.set_listener_for_advanced_copy_options_checkbox();
				SPCO.set_listener_for_copy_all_attendee_info_checkbox();
				SPCO.set_listener_for_individual_copy_attendee_checkboxes();
				SPCO.set_listener_for_process_next_reg_step_button();
				SPCO.set_listener_for_display_payment_method();
				SPCO.set_listener_for_input_validation_value_change();
				SPCO.set_listener_for_datepicker_change();
				SPCO.set_listener_close_notifications();
				SPCO.set_listener_for_payment_amount_change();
				SPCO.auto_submit_gateway_form();
				SPCO.start_registration_time_limit_countdown();
			}
		},



		/**
		 *	@function disable_caching
		 */
		disable_caching : function() {
			// don't cache ajax
			$.ajaxSetup ({ cache: false });
			// clear firefox and safari cache
			$(window).unload( function() {});
		},



		/**
		 *	@function set_validation_defaults
		 */
		set_validation_defaults : function() {

			// jQuery validation object
			$.validator.setDefaults({

				debug: false,
				ignore: '.ee-do-not-validate',
				validClass: '',
				errorClass: 'ee-required-text',

				errorPlacement: function( error, element ) {
					$(element).before( error );
					SPCO.invalid_input_errors.push( error.text() );
					SPCO.track_validation_error( element.attr('id') );
				},

				highlight: function( element ) {
					if ( ! $(element ).hasClass('spco-next-step-btn') ) {
						$( element ).addClass( 'ee-needs-value' ).removeClass( 'ee-has-value' );
					}
				},
				unhighlight: function( element ) {
					if ( ! $(element ).hasClass('spco-next-step-btn') ) {
						$(element).removeClass('ee-needs-value').addClass('ee-has-value');
					}
				},

				invalidHandler: function() {
					SPCO.reset_validation_vars();
				}

			});

		},



		/**
		 *	@function initialize_form_validation
		 */
		initialize_form_validation : function() {
			if ( SPCO.verify_form_validation_exists( 'initialize_form_validation' )) {
				EEFV.initialize( ee_form_section_vars.form_data );
			}
		},



		/**
		 *	@function track_validation_error
		 * @param {string} invalid_input_id
		 */
		track_validation_error : function( invalid_input_id ) {
			// convert to jQuery object
			var invalid_input = $( '#' + invalid_input_id );
			var invalid_input_label = $( '#' + invalid_input_id + '-lbl' );
			SPCO.invalid_input_to_scroll_to = SPCO.invalid_input_to_scroll_to === null ? $( invalid_input_label ) : SPCO.invalid_input_to_scroll_to;
			// grab input label && remove "required" asterisk
			var input_label_text = $( invalid_input_label ).text().replace( '*', '' );
			// add to invalid input array
			SPCO.require_values.push( input_label_text );
			// add to list of validation errors
			if ( $(invalid_input).hasClass('email') ) {
				SPCO.error_msgs.push( eei18n.enter_valid_email );
			} else if ( $(invalid_input).is(':radio') || $(invalid_input).is(':checkbox') ) {
				SPCO.error_msgs.push( input_label_text + eei18n.required_multi_field );
			} else {
				SPCO.error_msgs.push( input_label_text + eei18n.required_field );
			}
		},



		/**
		 *	@function display_validation_errors
		 */
		display_validation_errors : function() {
			//remove duplicates
			SPCO.require_values = _.unique( SPCO.require_values );
			// no empty or invalid fields that need values ?
			if ( SPCO.require_values.length > 0 ) {
				// array to hold our final processed error messages
				var error_msgs = [];
				// add required questions call to action
				error_msgs.push( eei18n.answer_required_questions );
				//remove duplicates
				SPCO.error_msgs = _.unique( SPCO.error_msgs );
				// loop thru tracked errors
				$.each( SPCO.error_msgs, function( index, error_msg ){
					// is a custom message from the form system actually set ?
					if ( typeof SPCO.invalid_input_errors[ index ] !== 'undefined' && SPCO.invalid_input_errors[ index ].substring(0, 22) !== "This field is required" ) {
						// use custom form system error
						error_msgs.push( SPCO.invalid_input_errors[ index ] );
					} else {
						// use SPCO error message cuz they are nicer than the system defaults
						error_msgs.push( error_msg );
					}
				});
				// concatenate and tag error messages
				var error_msg = SPCO.tag_message_for_debugging( 'display_validation_errors', error_msgs.join( '<br/>' ));
				// scroll to top of form or to the first invalid input?
				SPCO.invalid_input_to_scroll_to = SPCO.invalid_input_to_scroll_to.length === 0 ? SPCO.main_container : SPCO.invalid_input_to_scroll_to;
				// display error_msg
				SPCO.scroll_to_top_and_display_messages( SPCO.invalid_input_to_scroll_to, SPCO.generate_message_object( '', error_msg, '' ), true );
			}
		},



		/**
		 * @function uncheck_copy_option_inputs
		 *	set/remove "requires-value and needs-value" classes after change, if field is no longer empty
		 */
		uncheck_copy_option_inputs : function() {
			// unset all copy attendee info checkboxes
			$('#spco-copy-all-attendee-chk').prop( 'checked', false );
			$('.spco-copy-attendee-chk').each( function() {
				$(this).prop('checked', false);
			});
		},



		/**
		*  @function set_listener_for_advanced_copy_options_checkbox
		 * set_listener_for_advanced_copy_options_checkbox
		* This is the "advanced copy options" link in Step 1 for the "Use Attendee #1's information for ALL attendees" box
		*/
		set_listener_for_advanced_copy_options_checkbox : function() {
			$('#display-more-attendee-copy-options').on( 'click', function() {
				$('#spco-copy-all-attendee-chk').prop('checked', false);
			});
		},



		/**
		*  @function set_listener_for_copy_all_attendee_info_checkbox
		 * set_listener_for_copy_all_attendee_info_checkbox
		*	if the Copy All option is checked off, trigger click event on all checkboxes
		*/
		set_listener_for_copy_all_attendee_info_checkbox : function() {
			var spco_copy_all_attendee_chk = $('#spco-copy-all-attendee-chk');
			$( spco_copy_all_attendee_chk ).on( 'click', function() {
				if ( $(this).prop('checked')) {
					SPCO.reset_validation_vars();
					SPCO.do_before_sending_ajax();
//					var primary_reg_questions = SPCO.validate_primary_registrant_questions();
					if ( SPCO.require_values.length > 0 ) {
						// uncheck the checkbox that was clicked
						$(this).prop('checked', false);
						SPCO.display_validation_errors();
					} else {
						$('.spco-copy-attendee-chk').each( function() {
							if ( $( spco_copy_all_attendee_chk ).prop('checked') && $(this).prop('checked') !== $( spco_copy_all_attendee_chk ).prop('checked') ) {
								$(this ).trigger('click');
							}
						});
						SPCO.display_messages( SPCO.generate_message_object( eei18n.attendee_info_copied, '', '' ), true );
					}
				}
			});
		},



		/**
		 * @function validate_primary_registrant_questions
		 */
		validate_primary_registrant_questions : function() {
			// get all form inputs for the primary attendee
			var primary_reg_questions = SPCO.get_primary_reg_questions();
			$( primary_reg_questions ).each( function() {
				if( ! $(this).valid() ) {
					SPCO.track_validation_error( $(this ).attr('id') );
				}
			});
			return primary_reg_questions;
		},



		/**
		 * @function set_listener_for_individual_copy_attendee_checkboxes
		 * copy primary attendee details to this attendee
		 */
		set_listener_for_individual_copy_attendee_checkboxes : function() {
			$('#spco-copy-attendee-dv').on( 'click', '.spco-copy-attendee-chk', function() {
				var primary_reg_questions = SPCO.validate_primary_registrant_questions();
				SPCO.copy_primary_registrant_information( $(this), primary_reg_questions );
			});
		},



		/**
		 * @function set_listener_for_process_next_reg_step_button
		 * submit registration form - submit form and proceed to next step
		 */
		set_listener_for_process_next_reg_step_button : function() {
			//console.log( JSON.stringify( '**set_listener_for_process_next_reg_step_button**', null, 4 ) );
			SPCO.main_container.on( 'click', '.spco-next-step-btn', function( e ) {
				//console.log( JSON.stringify( 'SPCO spco-next-step-btn  >CLICK <', null, 4 ) );
				SPCO.current_form_to_validate = $(this).parents('form:first');
				SPCO.form_is_valid = SPCO.current_form_to_validate.valid();
				SPCO.main_container.trigger( 'process_next_step_button_click', [ $( this ) ] );
				//console.log( JSON.stringify( 'SPCO FINISHED "process_next_step_button_click" event', null, 4 ) );
				//console.log( JSON.stringify( 'SPCO.form_is_valid: ' + SPCO.form_is_valid, null, 4 ) );
				//console.log( JSON.stringify( 'SPCO eei18n.ajax_submit: ' + eei18n.ajax_submit, null, 4 ) );
				if ( ! SPCO.form_is_valid ){
					SPCO.display_validation_errors();
				} else if ( eei18n.ajax_submit ) {
					SPCO.process_next_step( this );
				}
				if ( eei18n.ajax_submit ) {
					e.preventDefault();
					e.stopPropagation();
				}
			});
			// set additional_post_data as empty string
			SPCO.additional_post_data = '';
		},



		/**
		 * @function set_listener_for_display_payment_method
		 * payment method button - clicking a payment method option will display it's details while hiding others
		 */
		set_listener_for_display_payment_method : function() {
			SPCO.main_container.on( 'click', '.spco-payment-method', function() {
				//SPCO.console_log( 'set_listener_for_display_payment_method', $(this ).attr('id'), false );
				SPCO.display_payment_method( $(this).val() );
			});
		},



		/**
		 * @function set_listener_for_input_validation_value_change
		 * set/remove "requires-value and needs-value" classes after change, if field is no longer empty
		 */
		set_listener_for_input_validation_value_change : function() {
			SPCO.form_inputs.focusout( function() {
				$(this).val( $.trim( $(this).val() ) );
				$(this).valid();
            });
		},



		/**
		 * @function set_listener_for_datepicker_change
		 */
		set_listener_for_datepicker_change : function() {
			$('.datepicker').on('change', function () {
                $(this).valid();
            });
		},



		/**
		 * @function set_listener_close_notifications
		 * closes any open notices simply by clicking anywhere on the screen
		 */
		set_listener_close_notifications : function() {
			$('body').on( 'click', function() {
				SPCO.hide_notices();
			});
		},


        /**
         * @function set_listener_for_payment_amount_change
         */
        set_listener_for_payment_amount_change: function () {
            //console.log( JSON.stringify( '**SPCO.set_listener_for_payment_amount_change**', null, 4 ) );
            SPCO.main_container.on('spco_payment_amount', function (event, payment_amount) {
                // console.log( JSON.stringify( 'payment_amount: ' + payment_amount, null, 4 ) );
                if (parseInt(payment_amount) === 0) {
                    SPCO.remove_billing_forms();
                }
            });
        },


        /**
		 * @function auto_submit_gateway_form
		 */
		auto_submit_gateway_form : function() {
			var gateway_form = $( 'form[name="gateway_form"]' );
			if ( gateway_form.length > 0 ) {
				$( '#espresso-ajax-loading' ).show();
				gateway_form.submit();
			}
		},



		/**
		 * @function start_registration_time_limit_countdown
		 */
		start_registration_time_limit_countdown : function() {
			if ( SPCO.registration_time_limit.length > 0 && parseInt( eei18n.empty_cart ) !== 1 && parseInt( eei18n.revisit ) !== 1 ) {
				$( '#spco-registration-time-limit-pg' ).show();
				//SPCO.registration_session_expiration = new Date(Date.parse( $('#spco-registration-expiration-spn').html() ));
				var layout = (( new Date() ) - SPCO.registration_session_expiration ) < ( 60 * 60 * 1000 ) ? '{m<}{mnn}{sep}{m>}{s<}{snn}{s>} {ml}' : '{h<}{hnn}{sep}{h>}{m<}{mnn}{sep}{m>}{s<}{snn}{s>} {hl}';
				SPCO.registration_time_limit.countdown({
					labels: [ eei18n.timer_years, eei18n.timer_months, eei18n.timer_weeks, eei18n.timer_days, eei18n.timer_hours, eei18n.timer_minutes, eei18n.timer_seconds ],
					labels1: [ eei18n.timer_year, eei18n.timer_month, eei18n.timer_week, eei18n.timer_day, eei18n.timer_hour, eei18n.timer_minute, eei18n.timer_second ],
					until: SPCO.registration_session_expiration,
					layout: layout,
					onExpiry: function() {
						if ( SPCO.registration_session_expiration < new Date() ) {
							SPCO.main_container.slideUp( function() {
								SPCO.main_container.html( eei18n.registration_expiration_notice ).slideDown();
							} );
						}
					}
				});
			}
		},




		/**
		 * @function reset_validation_vars
		 */
		reset_validation_vars : function() {
			// reset
			SPCO.require_values = [];
			SPCO.multi_inputs_that_do_not_require_values = [];
			SPCO.success_msgs = [];
			SPCO.error_msgs = [];
			SPCO.offset_from_top = 0;
			SPCO.invalid_input_to_scroll_to = null;
		},


		/**
		 * @function reset_offset_from_top_modifier
		 */
		reset_offset_from_top_modifier : function() {
			SPCO.offset_from_top_modifier = -50;
	},




		/**
		 * @function copy_primary_registrant_information
		 *	capture values from the primary attendee's form inputs and copy them to the corresponding form inputs of the selected attendee
		 * @param {object} clicked_checkbox
		 * @param {object} primary_reg_questions
		 */
		copy_primary_registrant_information : function( clicked_checkbox, primary_reg_questions ) {
			var success = true;
			// is the checkbox that was clicked actually "checked"
			if ( clicked_checkbox.prop('checked')) {
				// the targeted attendee question group
				var targeted_attendee = clicked_checkbox.val();
				//SPCO.console_log( 'copy_primary_registrant_information : targeted_attendee', targeted_attendee, false );
				// for each question in the targeted attendee question group
				$( primary_reg_questions ).each( function() {
					var new_input_id = SPCO.calculate_target_attendee_input_id( $(this), targeted_attendee );
					//SPCO.console_log( 'copy_primary_registrant_information : new_input_id', new_input_id, true );
					var input_exists = $( new_input_id ).length;
					//console.log( JSON.stringify( new_input_id + ' input exists: ' + input_exists, null, 4 ) );
					if ( input_exists ){
						SPCO.copy_form_input_value_from_this( $(new_input_id), $(this) );
						$(new_input_id).trigger('change');
					} else {
						success = false;
					}
				});
			}
			return success;
		},



		/**
		 * @function get_primary_reg_questions
		 *	returns a jQuery object consisting of all of the form inputs assigned to the primary attendee
		 */
		get_primary_reg_questions : function () {
			// the primary attendee question group
			var primary_reg_qstn_grp = $('#primary_registrant').val();
			//SPCO.console_log( 'get_primary_reg_questions : primary_reg_qstn_grp = ', primary_reg_qstn_grp );
			// find all of the primary attendee's questions for this event
			return $( '#ee-registration-' + primary_reg_qstn_grp ).children( '.ee-reg-form-qstn-grp-dv' ).find(':input');
		},



		/**
		 * @function calculate_target_attendee_input_id
		 * @param {object} primary_reg_input
		 * @param {string} targeted_attendee
		 */
		calculate_target_attendee_input_id : function ( primary_reg_input, targeted_attendee) {
			var new_input_id = '';
			// here we go again...
			var input_id = $(primary_reg_input).attr('id');
			//SPCO.console_log( 'calculate_target_attendee_input_id : input_id', input_id, true );

			if ( typeof input_id !== 'undefined' ) {
				// split the above var
				var input_id_array =  input_id.split('-');
				//SPCO.console_log( 'calculate_target_attendee_input_id : input_id_array', input_id_array, false );
				// grab the current input's details
				var qstn_base = input_id_array[0];
				//var reg_id = input_id_array[1];
				var input_name = input_id_array[2];
				var answer_id = input_id_array[3];
				// var input_value = $(this).eeInputValue();
				//SPCO.console_log( 'calculate_target_attendee_input_id : input_name', input_name, false );

				new_input_id = '#' + qstn_base + '-' + targeted_attendee + '-' +  input_name;
				if ( typeof answer_id !== 'undefined' ) {
					new_input_id = new_input_id + '-' + answer_id;
				}
				//SPCO.console_log( 'calculate_target_attendee_input_id : new_input_id', new_input_id, false );
			}
			return new_input_id;
		},



		/**
		 * @function copy_form_input_value_from_this
		 * @param {object} target_input
		 * @param {object} copy_from
		 */
		copy_form_input_value_from_this : function( target_input, copy_from ) {
			if ( $(target_input).is(':radio') || $(target_input).is(':checkbox') ) {
				$(target_input).prop('checked', $(copy_from).prop('checked'));
//				SPCO.console_log( 'copy_form_input_value_from_this : input value copied', $(copy_from).prop('checked'), false );
			} else {
				$(target_input).val( $(copy_from).val() );
//				SPCO.console_log( 'copy_form_input_value_from_this : input value copied', $(copy_from).val(), false );
			}
		},



		/**
		 * @function collapse_question_groups
		 */
//		collapse_question_groups : function() {
//			$('.ee-reg-form-qstn-grp-dv').slideUp();
//			$('#spco-copy-attendee-dv').slideUp();
//			$('#spco-auto-copy-attendee-pg').slideUp();
////			$('#spco-display-event-questions-lnk').removeClass('hidden');
//		},



		/********** REG STEP NAVIGATION **********/



		/**
		 * @function
		 *  opens the the SPCO step specified by step_to_show
		 * shows msg as a notification
		 * @param {string} step_to_show
		 * @param {object} response
		 **/
		display_step : function( step_to_show, response ){
			SPCO.hide_steps();
			var step_to_show_div = $('#spco-' + step_to_show + '-dv' );
			if ( typeof response.return_data.reg_step_html !== 'undefined' ) {
				$( step_to_show_div ).html( response.return_data.reg_step_html );
			}
			$('.spco-step-display-dv').removeClass('active-step').addClass('inactive-step');
			$('#spco-step-'+step_to_show+'-display-dv').removeClass('inactive-step').addClass('active-step');
			$('#spco-edit-'+step_to_show+'-lnk').addClass('hidden');
			// bye bye spinner
			SPCO.end_ajax();
			$( step_to_show_div ).css({ 'display' : 'none' }).removeClass('hidden').slideDown( function() {
				SPCO.main_container.trigger( 'spco_display_step', [ step_to_show, response ] );
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response, true  );
			});
		},



		/**
		 * @function hide_steps
		 * Hides the step specified by step_to_hide
		 */
		hide_steps : function(){
			$('.spco-edit-step-lnk').each( function() {
				$(this).removeClass('hidden');
			});
			$('.spco-step-dv').each( function() {
				if ( ! $(this).is( ":hidden" )) {
					$(this).slideUp( 'fast' ).addClass('hidden');
				}
			});
		},



		/**
		 * @function enable_submit_buttons
		 */
		enable_submit_buttons : function() {
			//console.log( JSON.stringify( '**enable_submit_buttons**', null, 4 ) );
			$('.spco-next-step-btn').each( function() {
				$(this).prop( 'disabled', false ).removeClass( 'disabled spco-disabled-submit-btn' );
			});
		},



		/**
		 * @function disable_submit_buttons
		 */
		disable_submit_buttons : function() {
			//console.log( JSON.stringify( '**disable_submit_buttons**', null, 4 ) );
			$('.spco-next-step-btn').each( function() {
				$(this).prop( 'disabled', true ).addClass('disabled spco-disabled-submit-btn');
			});
		},



		/**
		 * @function process_next_step
		 *  submit a step of registration form
		 *  @param {object} next_step_btn
		 */
		process_next_step : function( next_step_btn ) {
			//console.log( JSON.stringify( '**SPCO.process_next_step()**', null, 4 ) );
			var step = $(next_step_btn).attr('rel');
			// add trigger point so other JS can join the party
			SPCO.main_container.trigger( 'process_next_step', [ step ] );
			if ( typeof step !== 'undefined' && step !== '' && ! $(next_step_btn).hasClass('disabled') ) {
				if ( step === 'payment_options' && SPCO.registration_session_expiration instanceof Date ) {
					// add time to session expiration (defaults to +10 minutes)
					SPCO.registration_session_expiration = SPCO.registration_session_expiration.setTime(
						SPCO.registration_session_expiration.getTime() + ( parseInt( eei18n.session_extension ) * 1000 )
					);
				}
				var next_step = SPCO.get_next_step_slug( step );
				//SPCO.console_log( 'process_next_step : step', step, true );
				//SPCO.console_log( 'process_next_step : next_step', next_step, false );
				// which form is being processed ?
				var form_to_check = '#ee-spco-'+step+'-reg-step-form';
				// not disabled? you are NOW!!!
				SPCO.disable_submit_buttons();
				SPCO.submit_reg_form ( step, next_step, form_to_check );
				return true;
			}
			return false;
		},



		/**
		 * @function get_next_step_slug
		 * @param {string} step
		 */
		get_next_step_slug : function( step ) {
			var step_index = _.indexOf( eei18n.reg_steps, step );
			step_index = step_index + 1;
			return typeof eei18n.reg_steps[ step_index ] !== 'undefined' ? eei18n.reg_steps[ step_index ] : null;
		},



		/**
		 * @function submit_reg_form
		 *  submit a step of registration form
		 *  @param {string} step
		 *  @param {string} next_step
		 *  @param {string} form_to_check
		 */
		submit_reg_form : function( step, next_step, form_to_check ) {

			//console.log( JSON.stringify( '**SPCO.submit_reg_form()**', null, 4 ) );
			//console.log( JSON.stringify( 'SPCO.allow_submit_reg_form: ' + SPCO.allow_submit_reg_form, null, 4 ) );
			if ( ! ( eei18n.ajax_submit && SPCO.allow_submit_reg_form )) {
				//console.log( JSON.stringify( 'NONE SHALL PASS !!!: ' + SPCO.allow_submit_reg_form, null, 4 ) );
				return;
			}

			//console.log( JSON.stringify( 'SPCO step: ' + step, null, 4 ) );
			//console.log( JSON.stringify( 'next_step: ' + next_step, null, 4 ) );
			//console.log( JSON.stringify( 'form_to_check: ' + form_to_check, null, 4 ) );
			var form_data = $( form_to_check ).serialize();
			form_data += '&process_form_submission=1';
			form_data += '&ee_front_ajax=1';
			form_data += '&noheader=true';
			form_data += '&step=' + step;
			form_data += '&EESID=' + eei18n.EESID;
			form_data += '&generate_reg_form=1';
			form_data += '&revisit=' + eei18n.revisit;
			form_data += '&e_reg_url_link=' + eei18n.e_reg_url_link;
			form_data += SPCO.additional_post_data;


			//console.log( '**SPCO SUBMIT REG FORM !!! ** form_data:' );
		// alert( 'ajax_url = ' + eei18n.ajax_url + '\n' + 'step = ' + step + '\n' + 'next_step = ' + next_step + '\n' + 'form_data = ' + form_data );
			// send form via AJAX POST
			$.ajax({

				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",

				beforeSend: function() {
					SPCO.do_before_sending_ajax();
					if ( next_step === 'finalize_registration' ) {
						// display processing registration message
						SPCO.display_processing_registration_notification();
					}
				},

				success: function( response ){
					//SPCO.console_log( 'submit_reg_form : step', step, true );
					//SPCO.console_log( 'submit_reg_form : next_step', next_step, false );
					//SPCO.console_log_object( 'submit_reg_form : response', response, 0 );
					SPCO.process_response( next_step, response );
				},

				error: function() {
					SPCO.submit_reg_form_server_error();
				}

			});

		},



		/**
		* @function get_next_reg_step
		* @param {string} next_step
		* @param {object} prev_response
		*/
		get_next_reg_step : function( next_step, prev_response ){

			if ( ! SPCO.get_next_step ) {
				return;
			}

			var form_data = 'action=display_spco_reg_step';
			form_data += '&step=' + next_step;
			form_data += '&process_form_submission=0';
			form_data += '&noheader=1';
			form_data += '&ee_front_ajax=1';
			form_data += '&EESID=' + eei18n.EESID;
			form_data += '&generate_reg_form=1';
			form_data += '&revisit=' + eei18n.revisit;
			form_data += '&e_reg_url_link=' + eei18n.e_reg_url_link;
			form_data += SPCO.additional_post_data;
			// alert( 'form_data = ' + form_data );

			$.ajax({

				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",

				beforeSend: function() {
					SPCO.do_before_sending_ajax();
				},

				success: function( response ){
//					SPCO.console_log( 'get_next_reg_step : next_step', next_step, true );
//					SPCO.console_log_object( 'get_next_reg_step : response', response );
                    if ( typeof prev_response.success !== 'undefined' ) {
                        if ( typeof response.return_data === 'undefined' ) {
                            response.return_data = {};
                        }
                        response.return_data.success = prev_response.success;
                    }
					SPCO.process_response( next_step, response );
				},

				error: function() {
					return SPCO.submit_reg_form_server_error();
				}

			});
		},



		/**
		 *  @function
		 *  @param {string} payment_method
		 */
		display_payment_method: function ( payment_method ) {

			if ( SPCO.methods_of_payment === null ) {
				SPCO.methods_of_payment = $( '#methods-of-payment' );
			}
			//SPCO.console_log( 'display_payment_method', payment_method, false );
			if ( payment_method === '' ) {
				var msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'display_payment_method', eei18n.invalid_payment_method ), '' );
				SPCO.scroll_to_top_and_display_messages( SPCO.methods_of_payment, msg, true  );
				return;
			}
			var form_data = 'step=payment_options';
			form_data += '&action=switch_spco_billing_form';
			form_data += '&selected_method_of_payment=' + payment_method;
			form_data += '&reset_payment_method=1';
			form_data += '&generate_reg_form=1';
			form_data += '&process_form_submission=0';
			form_data += '&noheader=1';
			form_data += '&ee_front_ajax=1';
			form_data += '&EESID=' + eei18n.EESID;
			form_data += '&revisit=' + eei18n.revisit;
			form_data += '&e_reg_url_link=' + eei18n.e_reg_url_link;
			form_data += SPCO.additional_post_data;

			// alert( 'form_data = ' + form_data );

			$.ajax({

				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",

				beforeSend: function() {
					SPCO.do_before_sending_ajax();
				},

				success: function( response ){
					//SPCO.console_log_object( 'display_payment_method : response', response );
					if ( typeof response !== 'undefined' && typeof response === 'object' ) {
						if ( typeof response.return_data === 'undefined' || typeof response.return_data !== 'object' ) {
							response.return_data = {};
						}
						response.return_data.payment_method = payment_method;
						SPCO.process_response( 'payment_options', response );
					} else {
						var msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'display_payment_method', eei18n.invalid_payment_method ), '' );
						SPCO.scroll_to_top_and_display_messages( SPCO.main_container, msg, true  );
					}
				},

				error: function() {
					return SPCO.submit_reg_form_server_error();
				}

			});

		},



		/**
		 * @function process_response		 *
		 * @param  {string} next_step
		 * @param  {object} response
		 */
		process_response : function( next_step, response ) {
			SPCO.allow_enable_submit_buttons = true;
			//clear additional_post_data
			SPCO.additional_post_data = '';
			// alert( 'next_step = ' + next_step );
			if ( typeof response === 'object' ) {
				// trigger a custom event so that other JS functions can add listeners for the "spco_process_response" event
				SPCO.main_container.trigger( 'spco_process_response', [ next_step, response ] );
				//  check for payment_amount
				if ( typeof response.payment_amount !== 'undefined' ) {
					SPCO.payment_amount = parseFloat( response.payment_amount );
					// console.log( JSON.stringify( 'SPCO.payment_amount: ' + SPCO.payment_amount, null, 4 ) );
					// trigger a custom event so that other JS functions can add listeners for the "spco_payment_amount" event
					SPCO.main_container.trigger( 'spco_payment_amount', [ SPCO.payment_amount ] );
				}
				// process response
				if ( typeof response.errors !== 'undefined' ) {
                   // no response...
                    SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response, true  );
                } else if ( typeof response.redirect_url !== 'undefined' && response.redirect_url !== '' ) {
					$( '#espresso-ajax-loading' ).show();
					// redirect browser
                    window.location.replace( response.redirect_url );
                } else if ( typeof response.attention !== 'undefined' ) {
                    // Achtung Baby!!!
                    SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response, true  );
                } else if ( typeof response.return_data !== 'undefined' ) {

					// if any new validation rules were sent...
					if ( typeof response.return_data.validation_rules !== 'undefined' ) {
						// remove any previously applied validation rules for each html form, before it gets removed
						SPCO.remove_previous_validation_rules();
					}
					// process valid response data
					if ( typeof response.return_data.reg_step_html !== 'undefined' ) {
						// get html for next reg step
						SPCO.display_step( next_step, response );
					} else if ( typeof response.return_data.payment_method_info !== 'undefined' ) {
						// switch_payment_methods
						SPCO.switch_payment_methods( response );
					} else if ( typeof response.return_data.redirect_form !== 'undefined' ) {
						// display_payment_method_redirect_form
						SPCO.display_payment_method_redirect_form( response.return_data.redirect_form );
					} else if ( typeof response.return_data.plz_select_method_of_payment !== 'undefined' ) {
						// plz_select_method_of_payment_prompt
						SPCO.plz_select_method_of_payment_prompt( response );
					}
					// once again, if any new validation rules were sent...
					if ( typeof response.return_data.validation_rules !== 'undefined' ) {
						// add new form's js validation rules to the mix, now that the new inputs exist
						//SPCO.console_log( 'set_new_validation_rules', response.return_data.payment_method, false );
						SPCO.set_new_validation_rules( next_step, response.return_data.validation_rules );
					}

				} else if ( typeof response.success !== 'undefined' ) {
					// yay
					SPCO.get_next_reg_step( next_step, response );
				} else {
					// oh noes...
					SPCO.submit_reg_form_server_error();
				}

            } else {
				var msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'process_response', eei18n.invalid_json_response ), '' );
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, msg, true  );
			}
			$( '.hide-if-no-js' ).removeClass( 'hide-if-no-js' );
		},



		/**
		 * @function verify_form_validation_exists
		 * @param  {string} source
		 */
		verify_form_validation_exists : function( source ) {
			// set error source
			if ( typeof source === 'undefined' || source === '' ) {
				source = 'verify_form_validation_exists';
			}
			if ( typeof EEFV === 'undefined' ) {
				// if WP_DEBUG is on, then display an error
				if ( eei18n.wp_debug ) {
					var msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( source, eei18n.validation_error ), '' );
					SPCO.scroll_to_top_and_display_messages( SPCO.main_container, msg, true  );
				}
				return false;
			}
			return true;
		},



		/**
		 * @function remove_previous_validation_rules
		 */
		remove_previous_validation_rules : function() {
			if ( SPCO.verify_form_validation_exists( 'remove_previous_validation_rules' )) {
				// remove any previously applied validation rules for each html form
				EEFV.remove_previous_validation_rules();
			}
		},



		/**
		 * @function set_new_validation_rules
		 * @param  {string} next_step
		 * @param  {object} validation_rules
		 */
		set_new_validation_rules : function( next_step, validation_rules ) {
			//SPCO.console_log( 'set_new_validation_rules : next_step', next_step, true );
			if ( SPCO.verify_form_validation_exists( 'set_new_validation_rules' )) {
				// pass new rules for setup
				EEFV.initialize( validation_rules.form_data );
				// the form id for the current step
				var form_id = 'ee-spco-' + next_step + '-reg-step-form';
				if ( typeof EEFV.form_validators[ form_id ] !== 'undefined' ) {
					//SPCO.console_log( 'set_new_validation_rules : form_id', form_id, true );
					SPCO.current_form_to_validate = EEFV.form_validators[ form_id ];
				}
			}
		},



		/**
		 * @function switch_payment_methods
		 * @param  {object} response
		 */
		switch_payment_methods : function( response ) {
			//SPCO.console_log( 'switch_payment_methods', response.return_data.payment_method, false );
            SPCO.remove_billing_forms();
//			SPCO.console_log_object( 'switch_payment_methods : response.return_data.payment_method = ', response.return_data.payment_method );
			if ( typeof response.return_data.payment_method !== 'undefined' ) {
				var payment_method_info = $('#spco-payment-method-info-' + response.return_data.payment_method );
				//SPCO.console_log( 'payment_method_info', payment_method_info.attr('id'), false );
				if ( typeof response.return_data.payment_method_info !== 'undefined' ) {
					payment_method_info.append( response.return_data.payment_method_info );
				}
				SPCO.enable_submit_buttons();
				payment_method_info.slideDown( function() {
					if ( typeof response.success !== 'undefined' ) {
						SPCO.scroll_to_top_and_display_messages( SPCO.methods_of_payment, response, true  );
					}
					SPCO.main_container.trigger( 'spco_switch_payment_methods', [ response.return_data.payment_method ] );
				});
			} else {
				var msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'switch_payment_methods', eei18n.invalid_payment_method ), '' );
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, msg, true  );
			}
			SPCO.end_ajax();
		},



		/**
		 * @function remove_billing_forms
		 */
		remove_billing_forms : function() {
            var payment_method_info_dv = $('.spco-payment-method-info-dv');
//			SPCO.console_log_object( 'remove_billing_forms : payment_method_info_dv = ', payment_method_info_dv );
            $(payment_method_info_dv).each(function () {
                //SPCO.console_log( 'remove_billing_forms : payment_method_info_dv', $( this ).attr('id'), false );
                $(this).hide();
                $(this).find('.sandbox-panel').remove();
                $(this).find('.ee-billing-form').remove();
            });
		},



		/**
		 * @function display_payment_method_redirect_form
		 * @param  {string} redirect_form
		 */
		display_payment_method_redirect_form : function( redirect_form ) {
			SPCO.hide_notices();
			SPCO.end_ajax();
			$( SPCO.main_container ).html( '<br /><div id="spco-payment-method-redirect-form" class="ee-attention"><h5>' + eei18n.forwarding_to_offsite + '</h5></div>' );
			var payment_method_redirect_form = $( '#spco-payment-method-redirect-form' );
			$( payment_method_redirect_form ).append( redirect_form );
			$('form[name="gateway_form"]').submit();
		},


		/**
		 * @function plz_select_method_of_payment_prompt
		 * @param  {object} response
		 */
		plz_select_method_of_payment_prompt : function( response ) {
			SPCO.methods_of_payment.addClass( 'plz-select-method-of-payment' );
			SPCO.scroll_to_top_and_display_messages( SPCO.methods_of_payment, response, true  );
		},



		/********** NOTIFICATIONS **********/



		/**
		 * @function set_offset_from_top
		 * @param  {object} item
		 * @param  {number} extra
		 */
		set_offset_from_top : function( item, extra ) {
			extra = typeof extra !== 'undefined' ? extra : SPCO.offset_from_top_modifier;
			SPCO.offset_from_top = $( item ).offset().top + extra;
			SPCO.offset_from_top = Math.max( 0, SPCO.offset_from_top );
		},



		/**
		 * @function scroll_to_top_and_display_messages
		 * @param  {object} item
		 * @param  {object} msg
		 * @param  {boolean} end_ajax
		 */
		scroll_to_top_and_display_messages : function( item, msg, end_ajax ) {
			//SPCO.console_log_object( 'scroll_to_top_and_display_messages msg', msg.success, 0 );
			// is message display being overridden by some other JS ?
			if ( SPCO.override_messages ) {
				return;
			}
			SPCO.hide_notices();
			//SPCO.console_log_object( 'scroll_to_top_and_display_messages $( item ).offset()', $( item ).offset(), 0 );
			if ( typeof $( item ) !== 'undefined' && typeof $( item ).offset() !== 'undefined' ) {
				if ( $( item ).offset().top + SPCO.offset_from_top_modifier !== SPCO.offset_from_top ) {
					SPCO.set_offset_from_top( item, SPCO.offset_from_top_modifier );
					var messages_displayed = false;
					$('body, html').animate({ scrollTop: SPCO.offset_from_top }, 'normal', function() {
						if ( ! messages_displayed ) {
							SPCO.display_messages( msg, end_ajax );
							messages_displayed = true;
						}
					});
				} else {
					SPCO.display_messages( msg, end_ajax );
				}
            }
		},



		/**
		 * @function display messages
		 * @param  {object} msg
		 * @param  {boolean} end_ajax
		 */
		display_messages : function( msg, end_ajax ){
//			SPCO.console_log_object( 'display_messages : msg' + ' = ', msg );
            if ( typeof msg.return_data !== 'undefined' && typeof msg.return_data.success !== 'undefined' && msg.return_data.success ) {
                msg.success = typeof msg.success !== 'undefined' && msg.success ? msg.return_data.success + '<br />' + msg.success : msg.return_data.success;
            }
			if ( typeof msg.attention !== 'undefined' && msg.attention ) {
				SPCO.show_event_queue_ajax_msg( 'attention', msg.attention, SPCO.notice_fadeout_attention, end_ajax );
			} else if ( typeof msg.errors !== 'undefined' && msg.errors ) {
                SPCO.show_event_queue_ajax_msg( 'error', msg.errors, SPCO.notice_fadeout_errors, end_ajax );
            } else if ( typeof msg.success !== 'undefined' && msg.success ) {
				SPCO.show_event_queue_ajax_msg( 'success', msg.success, SPCO.notice_fadeout_success, end_ajax );
			}
		},



		/**
		 * @function show event queue ajax msg
		 * @param  {string} type
		 * @param  {string} msg
		 * @param  {number} fadeOut
		 * @param  {boolean} end_ajax
		 */
		show_event_queue_ajax_msg : function( type, msg, fadeOut, end_ajax ) {
			// does an actual message exist ?
			if ( typeof msg !== 'undefined' && msg !== '' ) {
				// ensure message type is set
				var msg_type = typeof type !== 'undefined' && type !== '' ? type : 'error';
				// make sure fade out time is not too short
				fadeOut = typeof fadeOut === 'undefined' || fadeOut < SPCO.notice_fadeout_min ? SPCO.notice_fadeout_min : fadeOut;
				// center notices on screen
				$('#espresso-ajax-notices').eeCenter( 'fixed' );
				// target parent container
				var espresso_ajax_msg = $('#espresso-ajax-notices-' + msg_type);
				//  actual message container
				espresso_ajax_msg.children('.espresso-notices-msg').html( msg );
				// bye bye spinner
				if ( typeof end_ajax === 'undefined' || end_ajax !== false ) {
					SPCO.end_ajax();
				}
				// display message
				espresso_ajax_msg.stop().removeClass('hidden').show().delay( fadeOut ).fadeOut();
			} else {
				// bye bye spinner
				SPCO.end_ajax();
			}
			if ( SPCO.allow_enable_submit_buttons ) {
				SPCO.enable_submit_buttons();
			}
		},



		/**
		 * @function
		 * stop espresso-ajax-loading from spinning
		 */
		end_ajax : function() {
			// bye bye spinner
			$('#espresso-ajax-loading').fadeOut('fast');
		},



		/**
		 * @function
		 * stop any message alerts that are in progress
		 */
		hide_notices : function() {
			$('.espresso-ajax-notices').stop().hide();
		},



		/**
		 * @function do_before_sending_ajax
		 */
		do_before_sending_ajax : function() {
			SPCO.hide_notices();
			$('#espresso-ajax-long-loading').remove();
			$('#espresso-ajax-loading').show();
		},



		/**
		 * @function submit_reg_form_server_error
		 */
		submit_reg_form_server_error : function() {
			return SPCO.server_error( 'submit_reg_form_server_error', eei18n.reg_step_error );
		},



		/**
		 * @function ajax_request_server_error
		 */
		ajax_request_server_error : function() {
			return SPCO.server_error( 'ajax_request_server_error', eei18n.server_error );
		},



		/**
		 * @function server_error
		 * @param  {string} error_source
		 * @param  {string} error_msg
		 */
		server_error : function( error_source, error_msg ) {
			SPCO.hide_notices();
			var msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( error_source, error_msg ), '' );
			SPCO.scroll_to_top_and_display_messages( SPCO.main_container, msg );
			return false;
		},



		/**
		 * @function
		 * like do_before_sending_ajax() but for the finalize_registration step
		 */
		display_processing_registration_notification : function() {
			var msg = SPCO.generate_message_object( '', '', SPCO.tag_message_for_debugging( 'display_processing_registration_notification', eei18n.process_registration ));
			SPCO.scroll_to_top_and_display_messages( SPCO.main_container, msg, false );

			//SPCO.set_offset_from_top( SPCO.main_container, SPCO.offset_from_top_modifier );
			//var messages_displayed = false;
			//$('body, html').animate({ scrollTop: SPCO.offset_from_top }, 'normal', function() {
			//	if ( ! messages_displayed ) {
			//		$('#espresso-ajax-notices').eeCenter( 'fixed' );
			//		var espresso_ajax_notices_attention = $( '#espresso-ajax-notices-attention' );
			//		$( espresso_ajax_notices_attention ).find('.espresso-notices-msg').html( eei18n.process_registration );
			//		$( espresso_ajax_notices_attention ).removeClass('hidden').show();
			//		messages_displayed = true;
			//	}
			//});
		},



		/***********************   UTILITIES   ***********************/



		/**
		 * @function generate_message_object
		 * @param  {string} success_msg
		 * @param  {string} error_msg
		 * @param  {string} attention_msg
		 */
		generate_message_object : function( success_msg, error_msg, attention_msg ) {
			var msg = {};
			msg.success = typeof success_msg !== 'undefined' && success_msg !== '' ? success_msg : false;
			msg.errors = typeof error_msg !== 'undefined' && error_msg !== '' ? error_msg : false;
			msg.attention = typeof attention_msg !== 'undefined' && attention_msg !== '' ? attention_msg : false;
			return msg;
		},



		/**
		 *  @function console_log
		 *  print to the browser console
		 * @param  {string} item_name
		 * @param  {*} value
		 * @param  {boolean} spacer
		 */
		console_log: function ( item_name, value, spacer ) {
			if ( SPCO.display_debug === '1' ) {
				if ( typeof value === 'object' ) {
					SPCO.console_log_object( item_name, value, 0 );
				} else {
					if ( spacer === true ) {
						console.log( ' ' );
					}
					if ( typeof item_name !== 'undefined' && typeof value !== 'undefined' && value !== '' ) {
						console.log( item_name + ' = ' + value );
					} else if ( SPCO.display_debug === '1' && typeof item_name !== 'undefined' ) {
						console.log( item_name );
					}
				}
			}
		},

		/**
		 * @function console_log_object
		 * print object to the browser console
		 * @param  {string} obj_name
		 * @param  {object} obj
		 * @param  {number} depth
		 */
		console_log_object: function ( obj_name, obj, depth ) {
			if ( SPCO.display_debug === '1' ) {
				depth = typeof depth !== 'undefined' ? depth : 0;
				var spacer = '';
				for ( var i = 0; i < depth; i++ ) {
					spacer = spacer + '  ';
				}
				if ( typeof obj === 'object' ) {
					if ( ! depth ) {
						console.log( ' ' );
					}
					if ( typeof obj_name !== 'undefined' ) {
						console.log( 'console_log_object: ' + obj_name + ' : ' );
					} else {
						console.log( 'console_log_object : ' );
					}
					$.each( obj, function( index, value ){
						if ( typeof value === 'object' && depth < 2 ) {
							depth++;
							SPCO.console_log_object( index, value, depth );
						} else {
							console.log( spacer + index + ' = ' + value );
						}
						depth = 0;
					});
				} else {
					SPCO.console_log( spacer + obj_name, obj, true );
				}
			}
		},

		/**
		 * @function tag_message_for_debugging
		 * @param  {string} tag
		 * @param  {string} msg
		 */
		tag_message_for_debugging : function( tag, msg ) {
			return SPCO.display_debug === 1 ? msg + ' <span class="smaller-text">(&nbsp;' + tag + '&nbsp;)</span><br/>' : msg;
		}



	};
	// end of SPCO object

	/**
	 *	run SPCO
	 */
	SPCO.initialize();

});
