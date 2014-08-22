jQuery(document).ready(function($) {

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

		main_container : $('#ee-single-page-checkout-dv'),
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
		// modifier for offset_from_top
		offset_from_top_modifier : -50,
		// display debugging info in console?
		display_debug : 1,


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
//			if ( SPCO.offset_from_top === 0 ) {
				extra = typeof extra !== 'undefined' && extra !== '' ? extra : SPCO.offset_from_top_modifier;
				SPCO.offset_from_top = $( item ).offset().top + extra;
				SPCO.offset_from_top = Math.max( 0, SPCO.offset_from_top );
//			}
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
		scroll_to_top_and_display_messages : function( item, msg ) {
			if ( $( item ).offset().top + SPCO.offset_from_top_modifier !== SPCO.offset_from_top ) {
				SPCO.set_offset_from_top( item );
				$('body, html').animate({ scrollTop: SPCO.offset_from_top }, 'normal', function() {
					SPCO.display_messages( msg );
				});
			}
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
//				SPCO.console_log( 'process_next_step > step', step, true );
//				SPCO.console_log( 'process_next_step > next_step', next_step );
				// which form is being processed ?
				var form_to_check = '#ee-spco-'+step+'-reg-step-form';
//				if ( step === 'payment_options' ) {
//					form_to_check = SPCO.process_selected_gateway();
//					if ( form_to_check === false ) {
//						msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'process_next_step > ' + next_step, eei18n.no_payment_method ));
//						SPCO.scroll_to_top_and_display_messages( $('#ee-single-page-checkout-dv'), msg );
//						return false;
//					}
//				}
//				SPCO.console_log( 'process_next_step > form_to_check', form_to_check );
				// validate form
//				var good_to_go = SPCO.verify_all_questions_answered( form_to_check );
				var good_to_go = true;
//				SPCO.console_log( 'process_next_step > good_to_go', good_to_go );
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
//					SPCO.scroll_to_top_and_display_messages( $('#ee-single-page-checkout-dv') );
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
//			$('#spco-'+step+'-action').attr( 'name', 'action' );
			alert( '#spco-'+step+'-action = ' + $('#spco-'+step+'-action').val() );
			var form_data = $( form_to_check ).serialize();
			form_data += '&ee_front_ajax=1';
			form_data += '&noheader=true';
			form_data += '&step=' + step;
			form_data += '&EESID=' + eei18n.EESID;
//			SPCO.console_log( 'submit_reg_form > form_data', form_data, true );
//			alert( 'ajax_url = ' + eei18n.ajax_url + '\n' + 'step = ' + step + '\n' + 'next_step = ' + next_step + '\n' + 'form_data = ' + form_data );
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
//					SPCO.console_log_obj( 'submit_reg_form > response', response );

					if ( typeof response !== 'undefined' ) {
//
//						SPCO.console_log_obj( 'submit_reg_form > response', response );
//
//						SPCO.console_log( 'submit_reg_form > response.success', response.success );
//						SPCO.console_log( 'submit_reg_form > response.errors', response.errors );
//						SPCO.console_log_obj( 'submit_reg_form > response.return_data', response.return_data );
//
////						SPCO.enable_submit_buttons();
						// hide recaptcha?
						if ( typeof response.recaptcha_passed !== 'undefined' ) {
							if ( response.recaptcha_passed ) {
								$( '#spco-captcha' ).children( 'span' ).html('');
							}
						// or reload recaptcha ?
						} else if ( typeof response.recaptcha_reload !== 'undefined' ) {
							$('#recaptcha_reload').trigger('click');
							SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response );
						// process valid response data
						} else if ( typeof response.return_data !== 'undefined' ) {
							SPCO.process_return_data( next_step, response );
						} else {
//							// uh-oh spaghettios!
							if ( typeof response.errors !== 'undefined' && response.errors !== '' ) {
								SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response );
							} else if ( typeof response.success !== 'undefined' && response.success !== '' ) {
								SPCO.get_next_reg_step( next_step, response );
							} else {
								SPCO.submit_reg_form_server_error( response );
							}

						}
					} else {
						SPCO.submit_reg_form_server_error( response );
					}

				},

				error: function( response ) {
					SPCO.submit_reg_form_server_error( response );
				}

			});

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
				msg = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'submit_reg_form_server_error', eei18n.reg_step_error ));
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, msg );
			return false;
		},



		/**
		 * opens the the SPCO step specified by step_to_show
		 * shows msg as a notification
		 * @param step_to_show  (string) either step 1, 2, or 3
		 * @param msg  (string) message to show
		 * @return void
		 **/
		display_step : function( step_to_show, response ){
			SPCO.hide_steps();
			var step_to_show_div = $('#spco-' + step_to_show + '-dv' );
			SPCO.console_log_obj( 'display_step -> response', response );
			$( step_to_show_div ).html( response.reg_step_html );
			$('.spco-step-display-dv').removeClass('active-step').addClass('inactive-step');
			$('#spco-step-'+step_to_show+'-display-dv').removeClass('inactive-step').addClass('active-step');
			var step_to_show_link = $('#spco-edit-'+step_to_show+'-lnk');
			$( step_to_show_link ).addClass('hidden');
			SPCO.console_log( 'display_step -> step_to_show', step_to_show );
			SPCO.console_log( 'display_step -> "#spco-edit-'+step_to_show+'-lnk" class', $( step_to_show_link ).attr('class') );
			$('#espresso-ajax-loading').fadeOut('fast');
			$( step_to_show_div ).css({ 'display' : 'none' }).removeClass('hidden').slideDown( function() {
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response );
			});
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
		 *	process_return_data
		 */
		process_return_data : function( next_step, response ) {
			if ( typeof response !== 'undefined' && response.hasOwnProperty( 'return_data' )) {
				for ( var key in response.return_data ) {
					if ( typeof key !== 'undefined' && response.hasOwnProperty( key )) {
						SPCO.console_log_obj( 'process_return_data > ' + key, response.return_data[key] );
						if ( key === 'reg_step_html' ) {
							SPCO.get_next_reg_step( next_step, response );
						} else if ( key === 'redirect_url' ) {
							window.location.replace( response.return_data[key] );
							return;
						} else if ( key === 'redirect_form' ) {
							$( '#espresso-ajax-notices-attention' ).append( response.return_data[key] );
							document.forms.gateway_form.submit();
						} else if ( key === 'plz_select_method_of_payment' ) {
							var methods_of_payment = $( '#methods-of-payment' );
							$( methods_of_payment ).addClass( 'plz-select-method-of-payment' );
							SPCO.scroll_to_top_and_display_messages( $( methods_of_payment ), response );
							return;
						}
					}
				}
			}
			go_to[ next_step ]( response );
		},



		/**
		* get_next_reg_step
		*/
		get_next_reg_step : function( next_step, prev_response ){

			var form_data = 'action=display_spco_reg_step';
			form_data += '&step=' + next_step;
			form_data += '&noheader=1';
			form_data += '&ee_front_ajax=1';
			form_data += '&EESID=' + eei18n.EESID;

			alert( 'form_data = ' + form_data );

			$.ajax({

				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",

				beforeSend: function() {
					SPCO.do_before_sending_ajax();
				},

				success: function( response ){

//					SPCO.console_log_obj( 'get_next_reg_step > response', response );

					if ( typeof response !== 'undefined' ) {
						// uh-oh spaghettios!
						if ( typeof response.errors !== 'undefined' && response.errors !== '' ) {
							SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response );
						} else if ( typeof response.reg_step_html !== 'undefined' && response.reg_step_html !== '' ) {
							SPCO.display_step( next_step, response );
						}
					} else {
						return SPCO.submit_reg_form_server_error( response );
					}
				},

				error: function( response ) {
					return SPCO.submit_reg_form_server_error( response );
				}

			});
		},



		/**
		 *    console_log - print to the browser console
		 */
		display_payment_method: function ( item ) {
			var payment_method = $(item).val();
			$('.spco-payment-method-info-dv' ).hide();
			$( '#spco-payment-method-info-' + payment_method ).slideDown( function() {
				SPCO.scroll_to_top_and_display_messages( $('#methods-of-payment'), '' );
			});
		},



		/**
		 *	generate_message_object
		 */
		generate_message_object : function( success_msg, error_msg ) {
			msg = {};
			msg.success = typeof success_msg !== 'undefined' && success_msg !== '' ? success_msg : false;
			msg.errors = typeof error_msg !== 'undefined' && error_msg !== '' ? error_msg : false;
			return msg;
		},



		/**
		 *    console_log - print to the browser console
		 */
		console_log: function ( item, value, spacer ) {
			if ( spacer === true ) {
				console.log( ' ' );
			}
			if ( SPCO.display_debug && typeof item !== 'undefined' && typeof value !== 'undefined' ) {
				console.log( JSON.stringify( item + ': ' + value, null, 4 ));
			} else if ( SPCO.display_debug && typeof item !== 'undefined' ) {
				console.log( item );
			}
		},

		/**
		 *    console_log_obj - print object to the browser console
		 */
		console_log_obj: function (obj_name, obj) {
			if ( SPCO.display_debug && typeof obj_name !== 'undefined' ) {
				console.log( JSON.stringify(obj_name, null, 4 ));
			}
			if ( SPCO.display_debug && typeof obj !== 'undefined' ) {
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
			return SPCO.display_debug === 1 ? msg + ' <span class="smaller-text">(&nbsp;' + tag + '&nbsp;)</span><br/>' : msg;
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
//			$( '#spco-display-event-questions-lnk' ).trigger('click');
			SPCO.display_step( 'attendee_information', response );
		},

		// go to payment_options
		payment_options : function ( response ) {
//			$('.reg-page-billing-info-dv').addClass('hidden');
//			$('.reg-page-payment-option-dv').removeClass('hidden');
			SPCO.display_step( 'payment_options', response );
		},

		// go to registration_confirmation
		registration_confirmation : function ( response ) {
			SPCO.display_step( 'registration_confirmation', response );

		},

		// finalize_registration
		finalize_registration : function ( response ) {
			SPCO.scroll_to_top_and_display_messages( SPCO.main_container, response );
		}

	};




	/**
	 *	submit registration form
	 */
	SPCO.main_container.on( 'click', '.spco-next-step-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();
		SPCO.process_next_step( this );
	});





	/**
	 *	payment method button
	 */
	SPCO.main_container.on( 'click', '.spco-payment-method', function(e) {
		SPCO.display_payment_method( this );
	});



});