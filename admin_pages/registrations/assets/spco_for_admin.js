var SPCO;
jQuery(document).ready( function($) {

	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );

	SPCO = {

		// array of input fields that require values
		require_values : [],
		// array of multi-value inputs (checkboxes and radio buttons) that do NOT require values
		multi_inputs_that_do_not_require_values : [],
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
				SPCO.disable_caching();
				SPCO.uncheck_copy_option_inputs();
				SPCO.set_listener_for_advanced_copy_options_checkbox();
				SPCO.set_listener_for_copy_all_attendee_info_checkbox();
				SPCO.set_listener_for_individual_copy_attendee_checkboxes();
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
					SPCO.reset_validation_vars();
					SPCO.validate_primary_registrant_questions();

					if ( SPCO.require_values.length > 0 ) {
						// uncheck the checkbox that was clicked
						$(this).prop('checked', false);
					} else {
						$('.spco-copy-attendee-chk').each( function() {
							if ( $( spco_copy_all_attendee_chk ).prop('checked') && $(this).prop('checked') !== $( spco_copy_all_attendee_chk ).prop('checked') ) {
								$(this ).trigger('click');
							}
						});
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
			SPCO.primary_registrant_questions_validated = false;
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
				// for each question in the targeted attendee question group
				$( primary_reg_questions ).each( function() {
					var new_input_id = SPCO.calculate_target_attendee_input_id( $(this), targeted_attendee );
					var input_exists = $( new_input_id ).length;
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
			} else {
				$(target_input).val( $(copy_from).val() );
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

			if ( typeof input_id !== 'undefined' ) {
				// split the above var
				var input_id_array =  input_id.split('-');
				// grab the current input's details
				var qstn_base = input_id_array[0];
				var input_name = input_id_array[2];
				var answer_id = input_id_array[3];

				new_input_id = '#' + qstn_base + '-' + targeted_attendee + '-' +  input_name;
				if ( typeof answer_id !== 'undefined' ) {
					new_input_id = new_input_id + '-' + answer_id;
				}
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
            // grab input label && remove "required" asterisk
			var input_label_text = $invalid_input_label.text().replace( '*', '' );
			// add to invalid input array
			SPCO.require_values.push( input_label_text );
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