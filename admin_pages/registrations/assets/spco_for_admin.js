var SPCO;
jQuery(document).ready( function($) {

	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );

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
		offset_from_top_modifier : -100,
		// the first invalid input in a form
		invalid_input_to_scroll_to : null,
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
        // array of inputs representing the primary registrant questions
        primary_reg_questions :  [],
        // tracking whether the  primary registrant questions have been validated or not
        primary_registrant_questions_validated :  false,



	/********** INITIAL SETUP **********/



		/**
		 * @function
		 */
		initialize : function() {
			if ( typeof eei18n !== 'undefined' ) {
				SPCO.form_inputs = SPCO.main_container.find( ':input' );
				SPCO.disable_caching();
				SPCO.uncheck_copy_option_inputs();
				SPCO.set_listener_for_advanced_copy_options_checkbox();
				SPCO.set_listener_for_copy_all_attendee_info_checkbox();
				SPCO.set_listener_for_individual_copy_attendee_checkboxes();
				console.log('Init');
			}
		},



		/**
		 *	@function
		 */
		disable_caching : function() {
			// don't cache ajax
			$.ajaxSetup ({ cache: false });
			// clear firefox and safari cache
			$(window).unload( function() {});
		},



		/**
		 * @function
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
		*  @function
		 * set_listener_for_advanced_copy_options_checkbox
		* This is the "advanced copy options" link in Step 1 for the "Use Attendee #1's information for ALL attendees" box
		*/
		set_listener_for_advanced_copy_options_checkbox : function() {
			$('#display-more-attendee-copy-options').on( 'click', function() {
				$('#spco-copy-all-attendee-chk').prop('checked', false);
			});
		},


		/**
		*  @function
		 * set_listener_for_copy_all_attendee_info_checkbox
		*	if the Copy All option is checked off, trigger click event on all checkboxes
		*/
		set_listener_for_copy_all_attendee_info_checkbox : function() {
			var spco_copy_all_attendee_chk = $('#spco-copy-all-attendee-chk');
			$( spco_copy_all_attendee_chk ).on( 'click', function() {
				if ( $(this).prop('checked')) {

					if ( SPCO.require_values.length > 0 ) {
						// uncheck the checkbox that was clicked
						$(this).prop('checked', false);
					} else {
						$('.spco-copy-attendee-chk').each( function() {
							if ( $( spco_copy_all_attendee_chk ).prop('checked') && $(this).prop('checked') !== $( spco_copy_all_attendee_chk ).prop('checked') ) {
								$(this ).trigger('click');
							}
						});
						SPCO.display_messages( eei18n.attendee_info_copied );
					}
                    SPCO.primary_registrant_questions_validated = false;
                }
			});
		},


		/**
		 * @function
		 */
		reset_validation_vars : function() {
			// reset
			SPCO.require_values = [];
			SPCO.multi_inputs_that_do_not_require_values = [];
			SPCO.success_msgs = [];
			SPCO.error_msgs = [];
			SPCO.offset_from_top = 0;
			SPCO.primary_registrant_questions_validated = false;
		},


		/**
		 * @function
		 * @param  {object} msg
		 */
		display_messages : function( msg ){
			console.log( msg );
		},


		/**
		 * @function
		 */
		validate_primary_registrant_questions : function() {
		    if (SPCO.primary_registrant_questions_validated){
		        return SPCO.primary_reg_questions;
            }
			// get all form inputs for the primary attendee
			SPCO.primary_reg_questions = SPCO.get_primary_reg_questions();
			$(SPCO.primary_reg_questions).each( function() {
				if( ! $(this).valid() ) {
					SPCO.track_validation_error( $(this ).attr('id') );
				}
			});
            SPCO.primary_registrant_questions_validated = true;
			return SPCO.primary_reg_questions;
		},


		/**
		 * @function
		 * copy primary attendee details to this attendee
		 */
		set_listener_for_individual_copy_attendee_checkboxes : function() {
			$('#spco-copy-attendee-dv').on( 'click', '.spco-copy-attendee-chk', function() {
                var primary_reg_questions = SPCO.validate_primary_registrant_questions();
				SPCO.copy_primary_registrant_information( $(this), primary_reg_questions );
			});
		},


		/**
		 * @function
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
		 * @function
		 * @param {object} target_input
		 * @param {object} copy_from
		 */
		copy_form_input_value_from_this : function( target_input, copy_from ) {
			if ( $(target_input).is(':radio') || $(target_input).is(':checkbox') ) {
				$(target_input).prop('checked', $(copy_from).prop('checked'));
				// SPCO.console_log( 'copy_form_input_value_from_this : input value copied', $(copy_from).prop('checked'), false );
			} else {
				$(target_input).val( $(copy_from).val() );
				// SPCO.console_log( 'copy_form_input_value_from_this : input value copied', $(copy_from).val(), false );
			}
		},



		/**
		 * @function
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
		 * @function
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
		 *	@function
		 * @param {string} invalid_input_id
		 */
		track_validation_error : function( invalid_input_id ) {
            // convert to jQuery object
			var $invalid_input = $( '#' + invalid_input_id );
			var is_multi = $invalid_input.is( ':radio' )
				|| $invalid_input.is(':checkbox' );
			var invalid_input_label_id = is_multi
				? $invalid_input.data('question_label')
				: invalid_input_id + '-lbl';
			var $invalid_input_label = $( '#' + invalid_input_label_id );
			SPCO.invalid_input_to_scroll_to = SPCO.invalid_input_to_scroll_to === null
                ? $invalid_input
                : SPCO.invalid_input_to_scroll_to;
            // grab input label && remove "required" asterisk
			var input_label_text = $invalid_input_label.text().replace( '*', '' );
			// add to invalid input array
			SPCO.require_values.push( input_label_text );
			// add to list of validation errors
			if ($invalid_input.hasClass('email') ) {
				SPCO.error_msgs.push( eei18n.enter_valid_email );
			} else if (is_multi) {
				SPCO.error_msgs.push( input_label_text + eei18n.required_multi_field );
			} else {
				SPCO.error_msgs.push( input_label_text + eei18n.required_field );
			}
		},


	};
	// end of SPCO object

	/**
	 *	run SPCO
	 */
	SPCO.initialize();



	// remove "requires-value" class if field is no longer empty
	$('input[type="text"]').focusout(function() {
		if ( $.trim(this.value) !== '' ){
			$(this).removeClass('requires-value');
		}
	});



	// show event questions
	$('#spco-display-event-questions-lnk').on( 'click', function() {
		$('.espresso-question-group-wrap').slideDown();
		$('#spco-copy-attendee-dv').slideDown();
		$(this).addClass('hidden');
	});


});