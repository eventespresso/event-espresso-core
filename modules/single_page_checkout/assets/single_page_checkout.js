jQuery(document).ready(function($) {
	

	/********** INITIAL SETUP **********/

	// don't cache ajax
	$.ajaxSetup ({ cache: false });
	// clear firefox and safari cache
	$(window).unload( function() {});

	// hide edit step links
	$('.spco-edit-step-lnk').addClass('hidden');

	// unset all copy attendee info checkboxes
	$('#spco-copy-all-attendee-chk').prop( 'checked', false );
	$('.spco-copy-attendee-chk').each(function(index) {
		$(this).prop('checked', false);
	});

	// if datepicker function exists
	if ( $.fn.datepicker ) {
		// activate datepicker fields
		$( '.datepicker' ).datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: "-80:+20"
		});
	}
	// to internationalize the datepicker, copy the following to somewhere safe, then edit and use the language code returned from the WP PHP function: get_bloginfo( 'language' ) for the array key.
	// Multiple languages can be added this way
/*
	$.datepicker.regional['fr_FR'] = {
		closeText: 'Fermer',
		prevText: 'Précédent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
		'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
		monthNamesShort: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
		'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
		dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
		dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
		dayNamesMin: ['D','L','M','M','J','V','S'],
		weekHeader: 'Sem.',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional[ eei18n.language ]);  	//	will automagically produce something like:	$.datepicker.setDefaults($.datepicker.regional['fr_FR']);
*/




	/********** SPCO CLASS **********/


	
	var SPCO = {
		
		// array of input fields that require values
		require_values : [],
		// array of multi-value inputs (checkboxes and radio buttons) that do NOT require values
		multi_inputs_that_do_not_require_values : [],
		// display debugging info in console?
		display_debug : false,
		// success message array
		success_msgs : [],
		// error message array
		error_msgs : [],
		// pixel position from top of form to scroll to after errors
		offset_from_top : 0,

		
		/**
		*	set_validation_classes
		*/
		set_input_validation_classes : function( input) {
			inputType = $(input).prop('type');
			if( $(input).hasClass('required') ) {
				if ( $(input).hasClass('email') ) {
					//var input_value = $(input).eeInputValue();
					if ( SPCO.validate_email_address( $(input).eeInputValue() ) === true ) {
						SPCO.set_single_input_requires_value_off( $(input) );
						$(input).addClass('has-value').removeClass('needs-value');
						$('#espresso-ajax-notices-error').stop().fadeOut('fast');
					} else {
						$(input).addClass('needs-value').removeClass('has-value');
					}
				} else if ( inputType == 'checkbox' || inputType ==  'radio' ) {
					if ( $(input).prop('checked')) {
						SPCO.set_multi_input_requires_value_off( $(input) );
						$(input).addClass('has-value').removeClass('needs-value');
						$('#espresso-ajax-notices-error').stop().fadeOut('fast');
					} else {
						$(input).addClass('needs-value').removeClass('has-value');
					}
				} else {
					if ( $.trim( input.val() ) !== '' ){
						SPCO.set_single_input_requires_value_off( $(input) );
						$(input).addClass('has-value').removeClass('needs-value');
						$('#espresso-ajax-notices-error').stop().fadeOut('fast');
					} else {
						$(input).addClass('needs-value').removeClass('has-value');
					}
				}
			}
		},



		/**
		*	reset_validation_vars
		*/
		reset_validation_vars : function() {
			// reset
			SPCO.require_values = [];
			SPCO.multi_inputs_that_do_not_require_values = [];
			SPCO.success_msgs = [];
			SPCO.error_msgs = [];
			SPCO.offset_from_top = 0;
		},



		/**
		*	copy_primary_attendee_information
		*	capture values from the primary attendee's form inputs and copy them to the corresponding form inputs of the selected attendee
		*/
		copy_primary_attendee_information : function( clicked_checkbox ) {
			// is the checkbox that was clicked actually "checked"
			if ( clicked_checkbox.prop('checked')) {

				// the targeted attendee question group
				var trgt_att_input = clicked_checkbox.val();
				SPCO.debug( 'copy_primary_attendee_information > trgt_att_input', trgt_att_input );
				
				// get all form inputs for the primary attendee
				var prmry_att_questions = SPCO.prmry_att_questions();
				// for each question in the targeted attendee question group
				$( prmry_att_questions ).each( function() {
					SPCO.validate_input( $(this) );
				});
				if ( SPCO.require_values.length > 0 ) {
					// uncheck the checkbox that was clicked
					$(clicked_checkbox).prop('checked', false);
				} else {
					// for each question in the targeted attendee question group
					$( prmry_att_questions ).each( function() {
						// here we go again...
						var input_id = $(this).attr('id');
						SPCO.debug( 'copy_primary_attendee_information > input_id', input_id, true );
												
						if ( typeof input_id !== 'undefined' ) {
							// split the above var
							var input_id_array =  input_id.split('-');
							SPCO.debug( 'copy_primary_attendee_information > input_id_array', input_id_array );
				
							// grab the current input's details
							var att_nmbr = input_id_array[0];
							var line_item_id = input_id_array[1];
							var input_name = input_id_array[2];
							var answer_id = input_id_array[3];
							var input_value = $(this).eeInputValue();
							SPCO.debug( 'copy_primary_attendee_information > input_name', input_name );

							var new_input_id = '#' + trgt_att_input + '-' +  input_name;
							if ( typeof answer_id !== 'undefined' ) {
								new_input_id = new_input_id + '-' + answer_id;
							}
							SPCO.debug( 'copy_primary_attendee_information > new_input_id', new_input_id );

							if ( $(new_input_id).length > 0 ){
								SPCO.copy_form_input_value_from_this( $(new_input_id), $(this) );
								$(new_input_id).trigger('change');
							}
						}
					});
					
					//SPCO.collapse_question_groups();

				}
			}
		},
		// end copy_primary_attendee_information()



		/**
		*	copy_primary_attendee_info_to_billing_info
		*	returns a jQuery object consisting of all of the form inputs assigned to the primary attendee
		*/
		copy_primary_attendee_info_to_billing_info : function () {
			var prmry_att_questions = SPCO.prmry_att_questions();
			// for each question in the targeted attendee question group
			$( prmry_att_questions ).each( function() {
				input_id = $(this).attr('id');
				if ( typeof input_id !== 'undefined' ) {
					// split the above var
					var input_id_array =  input_id.split('-');
					var input_name = input_id_array[2];
					// copy to billing info
					var billing = $('[id^=_reg-page-billing-' + input_name + ']');
					SPCO.debug( 'copy_primary_attendee_info_to_billing_info > billing', billing );
					if ( $(billing).length > 0 ){
						SPCO.copy_form_input_value_from_this( $(billing), $(this) );
					}
				}
			});
		},



		/**
		*	prmry_att_questions
		*	returns a jQuery object consisting of all of the form inputs assigned to the primary attendee
		*/
		prmry_att_questions : function () {
			// the primary attendee question group
			var prmry_att_qstn_grp = $('#primary-attendee').val();
			SPCO.debug( 'prmry_att_questions > prmry_att_qstn_grp', prmry_att_qstn_grp, true );
			// find all of the primaray attendee's questions for this event
			return $( '#spco-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find(':input');
		},



		/**
		*	validate_input
		*	deteremines whether a form input, or group of inputs, have received a value or not
		*/
		validate_input : function ( input ) {
			input_id = $(input).attr('id');
			SPCO.debug( 'validate_input > input_id', input_id, true );
			if ( typeof input_id !== 'undefined' ) {
				var valid_input = true;
				// get the input type
				input_type = $(input).prop('type');
				// form inputs whose values are obtained using .val()
				var uses_val = [ 'text', 'textarea', 'select-one', 'select-multiple' ];
				// form inputs whose values are obtained using .prop()
				var uses_prop = [ 'checkbox', 'radio' ];
				// is this input a single ?
				if ( $.inArray( input_type, uses_val ) > -1 ) {
					SPCO.debug( 'validate_input > ' + input_type, ' uses_val' );
					// grab it's value
					input_value = $(input).val();
					SPCO.debug( 'validate_input > input_value', input_value );
					// find label for this input and grab it's text
					var lbl_txt = $(input).closest('.reg-page-form-field-wrap-pg').find('label').html();
					lbl_txt = typeof lbl_txt === 'undefined' ? input_id : lbl_txt;
					if ( lbl_txt.length && $(input).hasClass( 'required' ) ) {
						// remove "<em>*</em>" from end
						lbl_txt = lbl_txt.substring(0, lbl_txt.length - 10);
					}
					SPCO.debug( 'validate_input > lbl_txt', lbl_txt );
					// is it an invalid email addy?
					if ( $(input).hasClass('email') && $(input).hasClass( 'required' ) && SPCO.validate_email_address( input_value ) !== true ) {
						valid_input = false;
						SPCO.error_msgs.push( eei18n.enter_valid_email );
					// OR is it required and empty ?
					} else if ( $(input).hasClass( 'required' ) && input_value === '' ) {
						valid_input = false;
						SPCO.error_msgs.push( lbl_txt + eei18n.required_field );
					}
					if ( valid_input !== true ) {
						SPCO.set_single_input_requires_value_on( $(input) );
						SPCO.require_values.push( lbl_txt );
						SPCO.set_offset_from_top( $(input).closest('.reg-page-form-field-wrap-pg').find('label'), -275 );
					}
				// or a multi ?
				} else if ( $.inArray( input_type, uses_prop ) > -1 ) {
					SPCO.debug( input_type, ' uses_prop' );
					// grab it's value
					input_value = $(input).prop('checked');
					SPCO.debug( 'validate_input > input_value', input_value );
					// find label for this input and grab it's text
					var lbl_txt = $(input).closest('.reg-page-form-field-wrap-pg').find('label').html();
					SPCO.debug( 'validate_input > lbl_txt', lbl_txt );
					// remove "<em>*</em>" from end
					if ( lbl_txt.length && $(input).hasClass( 'required' ) ) {
						// remove "<em>*</em>" from end
						lbl_txt = lbl_txt.substring(0, lbl_txt.length - 10);
					}
					SPCO.debug( 'validate_input > lbl_txt', lbl_txt );
					if ( $(input).hasClass( 'required' ) && input_value === false ) {
						// check that this input doesn't already have another option selected
						if ( ! _.contains( SPCO.multi_inputs_that_do_not_require_values, lbl_txt ) && ! _.contains( SPCO.require_values, lbl_txt )) {
							SPCO.require_values.push( lbl_txt );
							SPCO.error_msgs.push( lbl_txt + eei18n.required_multi_field );
							SPCO.set_multi_input_requires_value_on( $(input) );
							SPCO.set_offset_from_top( $(input).closest('ul'), -275 );
						}
					} else {
						if ( ! _.contains( SPCO.multi_inputs_that_do_not_require_values, lbl_txt )) {
							// an option has been selected so this question does not requre a value
							SPCO.multi_inputs_that_do_not_require_values.push( lbl_txt );
						}
						// remove from list of inputs that require values
						SPCO.require_values = _.without( SPCO.require_values, lbl_txt );
						SPCO.set_multi_input_requires_value_off( $(input) );
						SPCO.error_msgs = _.without( SPCO.error_msgs, lbl_txt + eei18n.required_multi_field );
					}
					SPCO.debug( 'validate_input > require_values', SPCO.require_values.join() );
					SPCO.debug( 'validate_input > multi_inputs_that_do_not_require_values', SPCO.multi_inputs_that_do_not_require_values.join() );
				}
			}
		},



		/**
		*	copy_form_input_value_from_this
		*/
		copy_form_input_value_from_this : function( target_input, copy_from ) {
			if ( $(target_input).is(':radio') || $(target_input).is(':checkbox') ) {
				$(target_input).prop('checked', $(copy_from).prop('checked'));
				SPCO.debug( 'copy_form_input_value_from_this > input value copied', $(copy_from).prop('checked') );
			} else {
				$(target_input).val( $(copy_from).val() );
				SPCO.debug( 'copy_form_input_value_from_this > input value copied', $(copy_from).val() );
			}
		},



		/**
		*	set_requires_value_on
		*/
		set_requires_value_on : function( input ) {
			var inputType = $(input).prop('type');
			if ( inputType ==  'checkbox' || inputType == 'radio' ) {
				SPCO.set_multi_input_requires_value_on( $(input) );
			} else {
				SPCO.set_single_input_requires_value_on( $(input) );
			}
		},



		/**
		*	set_requires_value_off
		*/
		set_requires_value_off : function( input ) {
			var inputType = $(input).prop('type');
			if ( inputType ==  'checkbox' || inputType == 'radio' ) {
				SPCO.set_multi_input_requires_value_off( $(input) );
			} else {
				SPCO.set_single_input_requires_value_off( $(input) );
			}
		},



		/**
		*	set_multi_input_requires_value_on
		*/
		set_multi_input_requires_value_on : function( input ) {
			$(input).closest('ul').addClass('requires-value');
			$(input).closest('ul').prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).removeClass('hidden');
		},



		/**
		*	set_multi_input_requires_value_off
		*/
		set_multi_input_requires_value_off : function( input ) {
			$(input).closest('ul').removeClass('requires-value');
			$(input).closest('ul').prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).addClass('hidden');
		},



		/**
		*	set_single_input_requires_value_on
		*/
		set_single_input_requires_value_on : function( input ) {
			$(input).addClass('requires-value');
			$(input).prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).removeClass('hidden');
		},



		/**
		*	set_single_input_requires_value_off
		*/
		set_single_input_requires_value_off : function( input ) {
			$(input).removeClass('requires-value');
			$(input).prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).addClass('hidden');
		},



		/**
		*	validate_email_address
		*/
		validate_email_address : function(email) {
			var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		},



		/**
		*	verify_all_questions_answered
		*/
		verify_all_questions_answered : function( whch_form ) {

			// reset
			SPCO.reset_validation_vars();
			// no form specified ?
			whch_form = typeof whch_form !== 'undefined' && whch_form !== '' ? whch_form : '#spco-registration-' + eei18n.reg_step_1 + '-frm';
			SPCO.debug( 'verify_all_questions_answered > whch_form', whch_form, true );
			
			// for each question in the targeted attendee question group
			$( whch_form + ' .required' ).each( function() {
				SPCO.validate_input( $(this) );
			});
			// any empty fields that need values ?
			if ( SPCO.validation_errors( 'verify_all_questions_answered' )) {
				return false;
			} else {
//				SPCO.collapse_question_groups();
				return true;
			}
		},



		/**
		*	validation_errors
		*/
		validation_errors : function( msg_tag, scroll_to_top ) {
			//remove duplicates
			SPCO.require_values = _.unique( SPCO.require_values );
			// no empty or invalid fields that need values ?
			if ( SPCO.require_values.length > 0 ) {
				SPCO.debug( msg_tag +' > require_values', SPCO.require_values.join() );
				SPCO.debug( msg_tag +' > multi_inputs_that_do_not_require_values', SPCO.multi_inputs_that_do_not_require_values.join() );
				// add required questions call to action
				SPCO.error_msgs.push( eei18n.answer_required_questions );
				//remove duplicates
				SPCO.error_msgs = _.unique( SPCO.error_msgs );
				// concatenate and tag error messages
				var error_msg = SPCO.tag_message_for_debugging( msg_tag, SPCO.error_msgs.join( '<br/>' ));
				// display error_msg
				if ( scroll_to_top !== false ) {
					SPCO.scroll_to_top_and_display_messages( SPCO.generate_message_object( '', error_msg ));
				} else {
					SPCO.display_messages( SPCO.generate_message_object( '', error_msg ));
				}
				return true;
			} else {
				return false;
			}
		},



		/**
		*	collapse_question_groups
		*/
		collapse_question_groups : function() {
			$('.espresso-question-group-wrap').slideUp();
			$('#spco-copy-attendee-dv').slideUp();
			$('#spco-auto-copy-attendee-pg').slideUp();
			$('#spco-display-event-questions-lnk').removeClass('hidden');
		},



		/**
		*	do_before_sending_ajax
		*/
		do_before_sending_ajax : function() {
			// stop any message alerts that are in progress
			$('.espresso-ajax-notices').stop();
			$('#espresso-ajax-long-loading').remove();
			$('#espresso-ajax-loading').show();
		},



		/**
		*	set_offset_from_top
		*/
		set_offset_from_top : function( item, extra ) {
			if ( SPCO.offset_from_top === 0 ) {
				extra = typeof extra !== 'undefined' && extra !== '' ? extra : 10;
				var top_of_form = $( item ).offset();
				SPCO.offset_from_top = top_of_form.top + extra;
				SPCO.offset_from_top = Math.max( 0, SPCO.offset_from_top );
			}
		},



		/**
		*	like do_before_sending_ajax() but for the finalize_registration step
		*/
		display_processing_registration_notification : function() {
			SPCO.set_offset_from_top( $('#single-page-checkout') );
			$('body, html').animate({ scrollTop: SPCO.offset_from_top }, 'normal', function() {
				// animation complete
				$('#espresso-ajax-long-loading').remove();
				$('#espresso-ajax-notices').eeCenter();
				$('#espresso-ajax-notices-attention').append( '<span id="espresso-ajax-long-loading" class="ee-spinner ee-spin"></span>' );
				$('#espresso-ajax-notices-attention > .espresso-notices-msg').html( eei18n.process_registration );
				$('#espresso-ajax-notices-attention').removeClass('hidden').show();
			});
		},



		/**
		*	show event queue ajax success msg
		*/
		show_event_queue_ajax_success_msg : function( success_msg, fadeOut ) {
			// make sure fade out time is not too short
			fadeOut = typeof fadeOut === 'undefined' || fadeOut < 4000 ? 4000 : fadeOut;
			// does an actual message exist ?
			if ( typeof success_msg !== 'undefined' && success_msg !== '' )  {
				$('#espresso-ajax-notices').eeCenter();
				$('#espresso-ajax-notices-success > .espresso-notices-msg').html( success_msg );
				$('#espresso-ajax-loading').fadeOut('fast');
				$('#espresso-ajax-notices-success').removeClass('hidden').show().delay(fadeOut).fadeOut();
			} else {
				$('#espresso-ajax-loading').fadeOut('fast');
			}
		},



		/**
		*	show event queue ajax error msg
		*/
		show_event_queue_ajax_error_msg : function( error_msg ) {
			$('#espresso-ajax-notices-attention').fadeOut('fast');
			// does an actual message exist ?
			if ( typeof error_msg !== 'undefined' && error_msg !== '' ) {
				$('#espresso-ajax-notices').eeCenter();
				$('#espresso-ajax-notices-error > .espresso-notices-msg').html( error_msg );
				$('#espresso-ajax-loading').fadeOut('fast');
				$('#espresso-ajax-notices-error').removeClass('hidden').show().delay(10000).fadeOut();
			} else {
				$('#espresso-ajax-loading').fadeOut('fast');
			}
		},



		/**
		*	scroll_to_top_and_display_messages
		*/
		scroll_to_top_and_display_messages : function( msg ) {
			SPCO.set_offset_from_top( $('#single-page-checkout') );
			$('body, html').animate({ scrollTop: SPCO.offset_from_top }, 'normal', function() {
				SPCO.display_messages( msg );
			});
		},



		/**
		 * display messages
		 */
		display_messages : function( msg ){
			if ( msg.success ) {
				SPCO.show_event_queue_ajax_success_msg( msg.success );
			} else if ( msg.error ) {
				SPCO.show_event_queue_ajax_error_msg( msg.error );
			}
		},



		/**
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
		 * opens the the SPCO step specified by step_to_show
		 * shows msg as a notification
		 * @param string step_to_show either step 1, 2, or 3
		 * @param string msg message to show
		 * @return void
		 **/
		display_step : function( step_to_show, msg ){
			SPCO.hide_steps();
			$('.spco-step-display-dv').removeClass('active-step').addClass('inactive-step');
			$('#spco-step-'+step_to_show+'-display-dv').removeClass('inactive-step').addClass('active-step');
			$('#spco-edit-'+step_to_show+'-lnk').addClass('hidden');
			SPCO.debug( 'display_step -> step_to_show', step_to_show );
			SPCO.debug( 'display_step -> "#spco-edit-'+step_to_show+'-lnk" class', $('#spco-edit-'+step_to_show+'-lnk').attr('class') );
			$('#espresso-ajax-loading').fadeOut('fast');
			$('#spco-'+step_to_show+'-dv').css({ 'display' : 'none' }).removeClass('hidden').slideDown( function() {
				SPCO.scroll_to_top_and_display_messages( msg );
			});
		},



		/**
		*	get_next_step
		*/
		get_next_step : function( step ) {
			step_index = _.indexOf( eei18n.reg_steps, step );
			step_index = step_index + 1;
			return eei18n.reg_steps[ step_index ];
		},




		/**
		*	process_selected_gateway
		*/
		process_selected_gateway : function() {
			
			var selected_gateway = $('#reg-page-selected-gateway').val();
			if ( selected_gateway === '' ) {
				return false;
			}
			var off_site_gateway = '#reg-page-gateway-off-site-'+selected_gateway;
			var off_site_payment = $( off_site_gateway ).val();
			var selected_gateway_dv = '#reg-page-billing-info-'+selected_gateway+'-dv';

			SPCO.debug( 'process_selected_gateway -> selected_gateway', selected_gateway, true );
			SPCO.debug( 'process_selected_gateway -> off_site_gateway', off_site_gateway );
			SPCO.debug( 'process_selected_gateway -> off_site_payment', off_site_payment );
			SPCO.debug( 'process_selected_gateway -> selected_gateway_dv', selected_gateway_dv );
			
			// set off-site-gateway status
			if ( off_site_payment == 1 ) {
				$('#reg-page-off-site-gateway').val( 1 );
			} else {
				$('#reg-page-off-site-gateway').val( 0 );
			}
			return selected_gateway_dv;
		},



		/**
		*	submit a step of registration form
		*/
		process_next_step : function( next_step_btn ) {
			var step = $(next_step_btn).attr('rel');
			if ( typeof step !== 'undefined' && step !== '' && ! $(next_step_btn).hasClass('disabled') ) {
				next_step = SPCO.get_next_step( step );
				SPCO.debug( 'process_next_step > step', step, true );
				SPCO.debug( 'process_next_step > next_step', next_step );
				// which form is being processed ?
				form_to_check = '#spco-registration-'+step+'-frm';
				if ( step == 'payment_options' ) {
					form_to_check = SPCO.process_selected_gateway();
					if ( form_to_check === false ) {
						msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'process_next_step > ' + next_step, eei18n.no_payment_method ));
						SPCO.scroll_to_top_and_display_messages( msg );
						return false;
					}
				}
				SPCO.debug( 'process_next_step > form_to_check', form_to_check );
				// validate form
				var good_to_go = SPCO.verify_all_questions_answered( form_to_check );
				SPCO.debug( 'process_next_step > good_to_go', good_to_go );
				// ready ?
				if ( good_to_go === true ) {
					// not disabled? you are NOW!!!
					$(next_step_btn).addClass( 'disabled' );
					// copy billing info?
					if ( step == 'attendee_information' ) {
						SPCO.copy_primary_attendee_info_to_billing_info();
					}
					if ( next_step == 'finalize_registration' && _.indexOf( eei18n.reg_steps, 'payment_options' ) !== -1 ) {
						if ( $('#reg-page-off-site-gateway').val() == 1 ) {
							SPCO.debug( 'process_next_step -> off-site-gateway', $('#reg-page-off-site-gateway').val() );
						}
						// disable submit btn and processing registration message
						SPCO.display_processing_registration_notification();
					}
					SPCO.submit_reg_form ( step, next_step, form_to_check );
				} else {
					// validation errors
					$( form_to_check ).slideDown();
//					SPCO.scroll_to_top_and_display_messages();
					return false;
				}
			}
		},



		/**
		*	submit a step of registration form
		*/
		submit_reg_form : function( step, next_step, form_to_check ) {

			$('#spco-'+step+'-noheader').val('true');
			$('#spco-'+step+'-action').attr( 'name', 'action' );
			var form_data = $('#spco-registration-'+step+'-frm').serialize();
			form_data += '&ee_front_ajax=1';
			form_data += '&step=' + step;
			form_data += '&EESID=' + eei18n.EESID;
			SPCO.debug( 'submit_reg_form > form_data', form_data, true );
			//alert( 'ajax_url = ' + eei18n.ajax_url + '\n' + 'step = ' + step + '\n' + 'next_step = ' + next_step + '\n' + 'form_data = ' + form_data );
			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",
				
				beforeSend: function() {
					if ( step == 'attendee_information' ) {
						SPCO.do_before_sending_ajax();
						SPCO.collapse_question_groups();
					} else if ( next_step != 'finalize_registration' ) {
						SPCO.do_before_sending_ajax();
					}
				},
				
				success: function( response ){
					
					SPCO.debug( 'submit_reg_form > step', step );
					SPCO.debug( 'submit_reg_form > next_step', next_step );
					
					if ( typeof response !== 'undefined' ) {
						
						SPCO.debug( 'submit_reg_form > response.success', response.success );
						SPCO.debug( 'submit_reg_form > response.error', response.error );
						for ( key in response.return_data ) {
							SPCO.debug( 'submit_reg_form > key', response.return_data[key] );
						}
						SPCO.enable_submit_buttons();
						// hide recaptcha?
						if ( typeof response.recaptcha_passed !== 'undefined' ) {
							if ( response.recaptcha_passed ) {
								$( '#spco-captcha span' ).html('');
							}							
						} 
						// or reload recaptcha ?
						if ( typeof response.recaptcha_reload !== 'undefined' ) {
							$('#recaptcha_reload').trigger('click');
							SPCO.scroll_to_top_and_display_messages( response );
						// process valid reponse data
						} else if ( typeof response.return_data !== 'undefined' ) {
							SPCO.process_return_data( next_step, response );
						} else {
							// uh-oh spaghettios!
							if ( typeof response.error !== 'undefined' && response.error !== '' ) {
								SPCO.scroll_to_top_and_display_messages( response );
							} else {
								go_to[ next_step ]( response );
							}
						}
					} else {
						return SPCO.submit_reg_form_server_error( response );
					}
							
				},
				
				error: function( response ) {
					return SPCO.submit_reg_form_server_error( response );
				}
						
			});

			return false;
					
		},



		/**
		*	submit_reg_form_server_error
		*/
		submit_reg_form_server_error : function( response ) {
			SPCO.debug( 'submit_reg_form_server_error > ajax error response', dump( response ));
			SPCO.enable_submit_buttons();
			msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'submit_reg_form_server_error', eei18n.reg_step_error ));
			SPCO.scroll_to_top_and_display_messages( msg );
			return false;
		},



		/**
		*	enable_submit_buttons
		*/
		enable_submit_buttons : function() {
			$('.spco-next-step-btn').each( function() {
				$(this).removeClass( 'disabled' );
			});
		},



		/**
		*	process_return_data
		*/
		process_return_data : function( next_step, response ) {
			for ( key in response.return_data ) {
				SPCO.debug( 'process_return_data > ' + key, response.return_data[key] );
				if ( key == 'reg-page-confirmation-dv' ) {
					$( '#reg-page-confirmation-dv' ).html( response.return_data[key] );
				} else if ( key == 'redirect-to-thank-you-page' ) {
					window.location.replace( response.return_data[key] );
					return;
				} else if ( key == 'off-site-redirect') {
					$( '#spco-extra-finalize_registration-inputs-dv' ).html( response.return_data[key] );
					document.forms['gateway_form'].submit();
				}
			}
			go_to[ next_step ]( response );
		},



		/**
		*	generate_message_object
		*/
		generate_message_object : function( success_msg, error_msg ) {
			msg = {};
			msg.success = typeof success_msg !== 'undefined' && success_msg !== '' ? success_msg : false;
			msg.error = typeof error_msg !== 'undefined' && error_msg !== '' ? error_msg : false;
			return msg;
		},



		/**
		*	debug
		*	print to the browser console
		*/
		debug : function( item, value, spacer ) {
			if ( eei18n.wp_debug == 1 && SPCO.display_debug ) {
				if ( spacer === true ) {
					console.log( ' ' );
				}
				console.log( JSON.stringify( item + ': ' + value, null, 4 ));
			}
		},



		/**
		*	tag_message_for_debugging
		*/
		tag_message_for_debugging : function( tag, msg ) {
			return eei18n.wp_debug == 1 ? msg + ' <span class="smaller-text">(&nbsp;' + tag + '&nbsp;)</span><br/>' : msg;
		}



	};
	// end of SPCO object
	
	

	/**
	*	go_to object...
	*	attendee_information
	*	payment_options
	*	registration_confirmation
	*	finalize_registration
	*/
	var go_to = {
		
		// go to attendee_information
		attendee_information : function ( response ) {
			$( '#spco-display-event-questions-lnk' ).trigger('click');
			SPCO.display_step( 'attendee_information', response );
		},

		// go to payment_options
		payment_options : function ( response ) {
			$('.reg-page-billing-info-dv').addClass('hidden');
			$('.reg-page-payment-option-dv').removeClass('hidden');
			SPCO.display_step( 'payment_options', response );
		},

		// go to registration_confirmation
		registration_confirmation : function ( response ) {
			SPCO.display_step( 'registration_confirmation', response );

		},

		// finalize_registration
		finalize_registration : function ( response ) {
			SPCO.scroll_to_top_and_display_messages( response );
		}

	};










	/********** JQUERY EVENT LISTENERS **********/



	// apply coupon button
	/**
	*	copy primary attendee details to this attendee
	*/
/*	$('#spco-apply-coupon-btn').on( 'click', function() {
		var error_msg = eei18n.invalid_coupon;
		if ( eei18n.wp_debug == 1 ) {
			error_msg = error_msg + ' (' + getFunctionName( arguments.callee.toString() ) + ' )';
		}
		SPCO.scroll_to_top_and_display_messages( SPCO.generate_message_object( '', error_msg ));
		return false;
	});
*/



	/**
	*	This is the "more options" link in Step 1 for the "Use Attendee #1's information for ALL attendees" box
	*/
	$('#display-more-attendee-copy-options').on( 'click', function() {
		$('#spco-copy-all-attendee-chk').prop('checked', false);
	});



	/**
	*	if the Copy All option is checked off, trigger click event on all checkboxes
	*/
	$('#spco-copy-all-attendee-chk').on( 'click', function() {
		if ( $(this).prop('checked')) {
			SPCO.do_before_sending_ajax();
			SPCO.reset_validation_vars();
			$('.spco-copy-attendee-chk').each( function(index) {
				if ( $('#spco-copy-all-attendee-chk').prop('checked') && $(this).prop('checked') != $('#spco-copy-all-attendee-chk').prop('checked') ) {
					$(this).trigger('click');
				}
			});
			// any empty or invalid fields that need values ?
			if ( ! SPCO.validation_errors( 'spco-copy-all-attendee-chk' )) {
				// display success_msg
				SPCO.display_messages( SPCO.generate_message_object( eei18n.attendee_info_copied ));
			}
		}
	});



	/**
	*	copy primary attendee details to this attendee
	*/
	$('.spco-copy-attendee-chk').on( 'click', function() {
		SPCO.copy_primary_attendee_information( $(this) );
	});


	/**
	*	set/remove "requires-value and needs-value" classes on load, if field is no longer empty
	*/
	$('#single-page-checkout :input').each( function() {
		if ( $(this).attr('type') != 'hidden' ) {
			SPCO.set_input_validation_classes( $(this) );
		}
	});


	/**
	*	set/remove "requires-value and needs-value" classes after change, if field is no longer empty
	*/
	$('#single-page-checkout :input').change(function() {
		SPCO.set_input_validation_classes( $(this) );
	});



	/**
	*	go to another step via "edit step" link
	*/
	$('#single-page-checkout').on( 'click', '.spco-edit-step-lnk', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var step = $(this).attr('rel');
		go_to[ step ]( '' );
	});



	/**
	*	submit registration form
	*/
	$('#single-page-checkout').on( 'click', '.spco-next-step-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();
		SPCO.process_next_step( $(this) );
	});



	/**
	*	display event questions
	*/
	$('#spco-display-event-questions-lnk').on( 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('.espresso-question-group-wrap').slideDown();
		$('#spco-copy-attendee-dv').slideDown();
		$(this).addClass('hidden');
	});




	/**
	*	display method of payment options
	*/
	$('.reg-page-payment-option-dv').on( 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var selected_payment_option = $(this).find('.reg-page-payment-option-lnk');
		var selected_gateway = selected_payment_option.attr('id');

		$('#reg-page-select-other-gateway-lnk').attr( 'rel', selected_gateway );
		$('#methods-of-payment').slideUp( 250, function() {
			$('.reg-page-payment-option-dv').each(function() {
				$(this).toggleClass( 'hidden' );
				$(this).find( ':input' ).each( function() {
					$(this).removeClass('required').removeClass('has-value').removeClass('needs-value');
				});
			});
			// get target element from "this" (the control element's) "rel" attribute
			var gateway_form = 'reg-page-billing-info-' + selected_payment_option.attr("rel");
			$('#reg-page-selected-gateway').val( selected_payment_option.attr("rel") );
			$('#'+gateway_form+'-dv').toggleClass( 'hidden' );
			$('#'+gateway_form+'-dv').find( ':input' ).each( function() {
				if ( $(this).attr('type') != 'hidden' ) {
					SPCO.set_input_validation_classes( $(this) );
				}
			});
			$('#hide-'+gateway_form).removeClass('hidden');
			$('#reg-page-select-other-gateway-lnk').toggleClass( 'hidden' );
			$('#select-method-of-payment-hdr').toggleClass( 'hidden' );
			$('#methods-of-payment').slideDown( 500 );
		});
	});



	/**
	*	select a different method of payment
	*/
	$('#reg-page-select-other-gateway-lnk').on( 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		selected_gateway = '#' + $(this).attr('rel');
		$(this).attr('rel', '');
		$( selected_gateway ).trigger('click');
	});



});