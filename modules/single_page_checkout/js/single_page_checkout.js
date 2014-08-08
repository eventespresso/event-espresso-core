jQuery(document).ready(function($) {

	alert( 'eei18n.EESID = ' + eei18n.EESID );

	/********** INITIAL SETUP **********/

	// don't cache ajax
	$.ajaxSetup ({ cache: false });
	// clear firefox and safari cache
	$(window).unload( function() {});


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
	$.datepicker.setDefaults($.datepicker.regional[ eei18n.language ]); //	will automagically produce something like:	$.datepicker.setDefaults($.datepicker.regional['fr_FR']);
*/


	/********** SPCO CLASS **********/



	var SPCO = {

		// array of input fields that require values
		require_values : [],
		// array of multi-value inputs (checkboxes and radio buttons) that do NOT require values
		multi_inputs_that_do_not_require_values : [],
		// success message array
		success_msgs : [],
		// error message array
		error_msgs : [],
		// pixel position from top of form to scroll to after errors
		offset_from_top : 0,
		// display debugging info in console?
		display_debug : true,


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
		 *	set_offset_from_top
		 */
		set_offset_from_top : function( item, extra ) {
			if ( SPCO.offset_from_top === 0 ) {
				extra = typeof extra !== 'undefined' && extra !== '' ? extra : 50;
				var top_of_form = $( item ).offset();
				SPCO.offset_from_top = top_of_form.top + extra;
				SPCO.offset_from_top = Math.max( 0, SPCO.offset_from_top );
			}
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
				var espresso_ajax_success = $('#espresso-ajax-notices-success');
				espresso_ajax_success.children('.espresso-notices-msg').html( success_msg );
				$('#espresso-ajax-loading').fadeOut('fast');
				espresso_ajax_success.removeClass('hidden').show().delay(fadeOut).fadeOut();
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
				var espresso_ajax_error = $('#espresso-ajax-notices-error');
				espresso_ajax_error.children('.espresso-notices-msg').html( error_msg );
				$('#espresso-ajax-loading').fadeOut('fast');
				espresso_ajax_error.removeClass('hidden').show().delay(10000).fadeOut();
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
			} else if ( msg.errors ) {
				SPCO.show_event_queue_ajax_error_msg( msg.errors );
			}
		},



		/**
		 *	submit a step of registration form
		 */
		process_next_step : function( next_step_btn ) {
			var step = $(next_step_btn).attr('rel');
			if ( typeof step !== 'undefined' && step !== '' && ! $(next_step_btn).hasClass('disabled') ) {
				var next_step = SPCO.get_next_step( step );
				SPCO.console_log( 'process_next_step > step', step, true );
				SPCO.console_log( 'process_next_step > next_step', next_step );
				// which form is being processed ?
				var form_to_check = '#ee-spco-'+step+'-reg-step-form';
//				if ( step === 'payment_options' ) {
//					form_to_check = SPCO.process_selected_gateway();
//					if ( form_to_check === false ) {
//						msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'process_next_step > ' + next_step, eei18n.no_payment_method ));
//						SPCO.scroll_to_top_and_display_messages( msg );
//						return false;
//					}
//				}
				SPCO.console_log( 'process_next_step > form_to_check', form_to_check );
				// validate form
//				var good_to_go = SPCO.verify_all_questions_answered( form_to_check );
				var good_to_go = true;
				SPCO.console_log( 'process_next_step > good_to_go', good_to_go );
				// ready ?
				if ( good_to_go === true ) {
					// not disabled? you are NOW!!!
//					$(next_step_btn).addClass( 'disabled' );
					// copy billing info?
//					if ( step === 'attendee_information' ) {
//						SPCO.copy_primary_attendee_info_to_billing_info();
//					}
//					if ( next_step === 'finalize_registration' && _.indexOf( eei18n.reg_steps, 'payment_options' ) !== -1 ) {
//						if ( $('#reg-page-off-site-gateway').val() === 1 ) {
//							SPCO.console_log( 'process_next_step -> off-site-gateway', $('#reg-page-off-site-gateway').val() );
//						}
//						// disable submit btn and processing registration message
//						SPCO.display_processing_registration_notification();
//					}
					SPCO.submit_reg_form ( step, next_step, form_to_check );
					return true;
				} else {
					// validation errors
					$( form_to_check ).slideDown();
//					SPCO.scroll_to_top_and_display_messages();
					return false;
				}
			}
			return false;
		},



		/**
		 *	get_next_step
		 */
		get_next_step : function( step ) {
			var step_index = _.indexOf( eei18n.reg_steps, step );
			step_index = step_index + 1;
			return eei18n.reg_steps[ step_index ];
		},



		/**
		*	submit a step of registration form
		*/
		submit_reg_form : function( step, next_step, form_to_check ) {

			$('#spco-'+step+'-noheader').val('true');
			$('#spco-'+step+'-action').attr( 'name', 'action' );
			var form_data = $( form_to_check ).serialize();
			form_data += '&ee_front_ajax=1';
			form_data += '&step=' + step;
			form_data += '&EESID=' + eei18n.EESID;
			SPCO.console_log( 'submit_reg_form > form_data', form_data, true );
			//alert( 'ajax_url = ' + eei18n.ajax_url + '\n' + 'step = ' + step + '\n' + 'next_step = ' + next_step + '\n' + 'form_data = ' + form_data );
			// send form via AJAX POST
			$.ajax({

				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",

				beforeSend: function() {
//					if ( step === 'attendee_information' ) {
//						SPCO.do_before_sending_ajax();
//						SPCO.collapse_question_groups();
//					} else if ( next_step !== 'finalize_registration' ) {
						SPCO.do_before_sending_ajax();
//					}
				},

				success: function( response ){

					SPCO.console_log( 'submit_reg_form > step', step );
					SPCO.console_log( 'submit_reg_form > next_step', next_step );
					SPCO.console_log_obj( 'submit_reg_form > response', response );

//					if ( typeof response !== 'undefined' ) {
//
//						SPCO.console_log_obj( 'submit_reg_form > response', response );
//
//						SPCO.console_log( 'submit_reg_form > response.success', response.success );
//						SPCO.console_log( 'submit_reg_form > response.errors', response.errors );
//						SPCO.console_log_obj( 'submit_reg_form > response.return_data', response.return_data );
//
////						SPCO.enable_submit_buttons();
//						// hide recaptcha?
////						if ( typeof response.recaptcha_passed !== 'undefined' ) {
////							if ( response.recaptcha_passed ) {
////								$( '#spco-captcha span' ).html('');
////							}
////						}
//						// or reload recaptcha ?
//						if ( typeof response.recaptcha_reload !== 'undefined' ) {
//							$('#recaptcha_reload').trigger('click');
//							SPCO.scroll_to_top_and_display_messages( response );
//						// process valid reponse data
//						} else if ( typeof response.return_data !== 'undefined' ) {
//							SPCO.process_return_data( next_step, response );
//						} else {
//							// uh-oh spaghettios!
//							if ( typeof response.errors !== 'undefined' && response.errors !== '' ) {
//								SPCO.scroll_to_top_and_display_messages( response );
//							} else {
////								go_to[ next_step ]( response );
//								SPCO.display_step( next_step );
//							}
//						}
//					} else {
//						return SPCO.submit_reg_form_server_error( response );
//					}

				},

				error: function( response ) {
					return SPCO.submit_reg_form_server_error( response );
				}

			});

			return false;

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
		 *	submit_reg_form_server_error
		 */
		submit_reg_form_server_error : function( response ) {
			SPCO.console_log( 'submit_reg_form_server_error > ajax error response', dump( response ));
//			SPCO.enable_submit_buttons();
//			msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'submit_reg_form_server_error', eei18n.reg_step_error ));
//			SPCO.scroll_to_top_and_display_messages( msg );
			return false;
		},

		/**
		 *    console_log - print to the browser console
		 */
		console_log: function ( item, value, spacer ) {
			if ( spacer === true ) {
				console.log( ' ' );
			}
			if ( eei18n.wp_debug && typeof item !== 'undefined' && typeof value !== 'undefined' ) {
				console.log( JSON.stringify( item + ': ' + value, null, 4 ));
			} else if ( eei18n.wp_debug && typeof item !== 'undefined' ) {
				console.log( item );
			}
		},

		/**
		 *    console_log_obj - print object to the browser console
		 */
		console_log_obj: function (obj_name, obj) {
			if ( eei18n.wp_debug && typeof obj_name !== 'undefined' ) {
				console.log( JSON.stringify(obj_name, null, 4 ));
			}
			if ( eei18n.wp_debug && typeof obj !== 'undefined' ) {
				for ( var key in obj ) {
					if ( typeof key !== 'undefined' && obj.hasOwnProperty( key )) {
						console.log( JSON.stringify('    ' + key + ': ' + obj[ key ], null, 4 ));
					}
				}
			}
		},

		/**
		 *	tag_message_for_debugging
		 */
		tag_message_for_debugging : function( tag, msg ) {
			return eei18n.wp_debug === 1 ? msg + ' <span class="smaller-text">(&nbsp;' + tag + '&nbsp;)</span><br/>' : msg;
		}



	};
	// end of SPCO object



	/**
	 *	submit registration form
	 */
	$('#ee-single-page-checkout-dv').on( 'click', '.spco-next-step-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();
		SPCO.process_next_step( $(this) );
	});



});