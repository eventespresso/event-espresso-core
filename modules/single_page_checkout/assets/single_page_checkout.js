(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {});
	
	$('.spco-edit-step-lnk').addClass('hidden');	
	
	// if datepicker is active
	if ( $.fn.datepicker ) {
		$( '.datepicker' ).datepicker({
			changeMonth: true,
			changeYear: true
		});
	}
	// to internationalize the datepicker, copy the following to somewhere safe, then edit and use the language code returned from the WP PHP function: get_bloginfo( 'language' ) for the array key. 
	// Multiple languages can be added this way
//	$.datepicker.regional['fr_FR'] = {
//		closeText: 'Fermer',
//		prevText: 'Précédent',
//		nextText: 'Suivant',
//		currentText: 'Aujourd\'hui',
//		monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
//		'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
//		monthNamesShort: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
//		'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
//		dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
//		dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
//		dayNamesMin: ['D','L','M','M','J','V','S'],
//		weekHeader: 'Sem.',
//		dateFormat: 'dd/mm/yy',
//		firstDay: 1,
//		isRTL: false,
//		showMonthAfterYear: false,
//		yearSuffix: ''
//	};
//	$.datepicker.setDefaults($.datepicker.regional[ eei18n.language ]);  	//	will automagically produce something like:	$.datepicker.setDefaults($.datepicker.regional['fr_FR']);

	$('#spco-copy-all-attendee-chk').prop( 'checked', false );

	// apply coupon button
	$('#spco-apply-coupon-btn').on( 'click', function() {
		var error_msg = eei18n.invalid_coupon;
		if ( eei18n.wp_debug == 1 ) {
			error_msg = error_msg + ' (' + getFunctionName( arguments.callee.toString() ) + ' )';
		}
		show_event_queue_ajax_error_msg( error_msg );
		return false;
	});



	// Step 1 - "more options" link in the "Use Attendee #1's information for ALL attendees" box
	$('#display-more-attendee-copy-options').on( 'click', function() {
		$('#spco-copy-all-attendee-chk').prop('checked', false);
	});



	/**
	*	if the Copy All option is checked off, trigger click event on all checkboxes 
	*/
	$('#spco-copy-all-attendee-chk').on( 'click', function() {
		$('.spco-copy-attendee-chk').each(function(index) {
			if ( $(this).prop('checked') != $('#spco-copy-all-attendee-chk').prop('checked') ) {
				$(this).trigger('click');
			}
		});
		var good_to_go = verify_all_questions_answered('#spco-registration-attendee_information-frm');		
		if ( good_to_go !== true ) {
			show_event_queue_ajax_error_msg( good_to_go );
		}
	});
	

	
	
	// in
	$('.spco-copy-attendee-chk').on( 'click', function() { 

		// the checkbox that was clicked
		var clicked_checkbox = $(this);
		
		// the primary attendee question group
		var prmry_att_qstn_grp = $('#primary-attendee').val();
//		console.log( JSON.stringify( 'prmry_att_qstn_grp: ' + prmry_att_qstn_grp, null, 4 ));
		// find all of the primaray attendee's questions for this event
		var prmry_att_questions = $( '#spco-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find('input');		
		//$( '#spco-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find('input').css('background','pink');

		// the targeted attendee question group
		var trgt_att_input = $(this).val();
//		console.log( JSON.stringify( 'trgt_att_input: ' + trgt_att_input, null, 4 ));
		
		// set some empty vars (and reset when we loop back)
		var input_id = '';
		var new_input_id = '';
		var input_name = '';
		var input_value = '';
		
		// for each question in the targeted attendee question group
		$( prmry_att_questions ).each(function(index) {
		
			input_id = $(this).attr('id');
			
			if ( input_id != undefined ) {
				// split the above var
				var input_id_array =  input_id.split('-');
//				console.log( JSON.stringify( 'input_id_array: ' + input_id_array, null, 4 ));
	
				// grab the current input's details
				var att_nmbr = input_id_array[0];		 
				var line_item_id = input_id_array[1];		 
				var input_name = input_id_array[2];	
				var answer_id = input_id_array[3];	
				// and it's value'
				input_value = $(this).val();
//				console.log( JSON.stringify( 'input_id: ' + input_id, null, 4 ));
//				console.log( JSON.stringify( 'input_name: ' + input_name, null, 4 ));
							
				// if the input is required but has not been filled out
				if ( $(this).hasClass('required') && input_value == '' ) {  
				
					$(this).addClass('requires-value');
					// find label for this input
					var lbl = $(this).prev('label');
					// grab it's text
					var lbl_txt = $(lbl).html();
					// remove "<em>*</em>" from end
					lbl_txt = lbl_txt.substring(0, lbl_txt.length - 10);
					// show an error msg
					var error_msg = lbl_txt + eei18n.required_field;
					if ( eei18n.wp_debug == 1 ) {
						error_msg = error_msg + ' ( spco-copy-attendee-chk )';
					}
					show_event_queue_ajax_error_msg( error_msg );	
					// uncheck the checkbox that was clicked
					$(clicked_checkbox).prop('checked', false);
					// fill out yer dang form will ya!!!
					exit;			
				
				} else {
	
					new_input_id = '#' + trgt_att_input + '-' +  input_name;
					if ( answer_id != undefined ) {
						new_input_id = new_input_id + '-' + answer_id;
					}
//					console.log( JSON.stringify( 'new_input_id: ' + new_input_id, null, 4 ));
					
					if ( $(new_input_id).length > 0 ){
						if ( $(new_input_id).is(':radio') && $('#' + input_id).is(':checked') === true ) {
//							console.log( JSON.stringify( 'radio: ', null, 4 ));
							$(new_input_id).prop('checked', true);
						} else if ( $(new_input_id).is(':checkbox') && $('#' + input_id).is(':checked') === true ) {
//							console.log( JSON.stringify( 'checkbox: ' , null, 4 ));
							$(new_input_id).prop('checked', true);
						} else {
//							console.log( JSON.stringify( 'other: ', null, 4 ));
							$(new_input_id).val(input_value);
						}						
					}
	
					var billing = '#reg-page-billing-' + input_name;
					// copy to billing info
					if ( $(billing).val() == '' ) {
						$(billing).val(input_value);
					}				
				}
			}

		});		
	});		
	
		
	
	/**
	*		do_before_event_queue_ajax
	*/	
	function do_before_event_queue_ajax() {
		// stop any message alerts that are in progress	
		$('.espresso-ajax-notices').stop();
		$('#espresso-ajax-loading').center().show();		
	}



	/**
	*		show event queue ajax success msg
	*/	
	function show_event_queue_ajax_success_msg( success_msg ) {
		
		if ( success_msg != undefined && success_msg != '' )  {
		
			if ( success_msg.success != undefined ) {
				success_msg = success_msg.success;
			}		
			//alert( 'success_msg'+success_msg);

			$('#espresso-ajax-notices').center();	
			$('#espresso-ajax-notices-success > .espresso-notices-msg').html( success_msg );
			$('#espresso-ajax-loading').fadeOut('fast');
			$('#espresso-ajax-notices-success').removeClass('hidden').show().delay(4000).fadeOut();			
		} else {
			$('#espresso-ajax-loading').fadeOut('fast');
		}	
	}	



	/**
	*		show event queue ajax error msg
	*/	
	function show_event_queue_ajax_error_msg( error_msg ) {
			
		if ( error_msg != undefined && error_msg != '' ) {
			
			if ( typeof( error_msg ) === 'object' && error_msg.error != undefined && error_msg.error != '' ) {
				error_msg = error_msg.error;				
			} 
						
			$('#espresso-ajax-notices').center();				
			$('#espresso-ajax-notices-error > .espresso-notices-msg').html( error_msg );
			$('#espresso-ajax-loading').fadeOut('fast');
			$('#espresso-ajax-notices-error').removeClass('hidden').show().delay(10000).fadeOut();

		} else {
			$('#espresso-ajax-loading').fadeOut('fast');
		}
	}
	
	// remove "requires-value" class if field is no longer empty
	$('input[type="text"]').focusout(function() {   
		if ( $.trim(this.value) != '' ){
			$(this).removeClass('requires-value');
		}
	});	



	function scroll_to_top_of_form( msg ) {
		//alert('scroll_to_top_of_form');
		var top_of_form = $('#spco-steps-display-dv').offset();
		top_of_form = top_of_form.top - 10;		
		$("html, body").animate({ scrollTop: top_of_form }, 'normal', function() {
			if ( msg.success ) {
				show_event_queue_ajax_success_msg( msg.success );
			} else {
				show_event_queue_ajax_error_msg( msg.error );
			}
		});
	}	

	
	/**
	 * Hides the step specified by step_to_hide
	 * @param int step_to_hide 1, 2, or 3
	 * @return void
	 **/
	function hide_steps(){
		$('.spco-edit-step-lnk').removeClass('hidden');		
		$('.spco-step-dv').slideUp( function() {				
			$('.spco-step-dv').height(0);
		});	
	}
	
	/**
	 * opens the the SPCO step specified by step_to_show
	 * shows msg as a notification
	 * @param int step_to_show either step 1, 2, or 3
	 * @param string msg message to show
	 * @return void
	 **/
	function go_to_step( step_to_show, msg ){
		$('.spco-step-display-dv').removeClass('active-step').addClass('inactive-step');	
		$('#spco-step-'+step_to_show+'-display-dv').removeClass('inactive-step').addClass('active-step');
		$('#spco-edit-'+step_to_show+'-lnk').addClass('hidden');	
		if ( eei18n.wp_debug == 1 ) {
			console.log( JSON.stringify( 'go_to_step -> step_to_show: ' + step_to_show, null, 4 ));
			console.log( JSON.stringify( 'go_to_step -> "#spco-edit-'+step_to_show+'-lnk" class: ' + $('#spco-edit-'+step_to_show+'-lnk').attr('class'), null, 4 ));
		}	
		$('#espresso-ajax-loading').fadeOut('fast');
		$('#spco-'+step_to_show+'-dv').css('display','none').removeClass('hidden').slideDown( function() {
			scroll_to_top_of_form( msg );
		});
	}
	
	var spco_go_to = {		
		
		// go to attendee_information
		attendee_information : function ( msg ) {		
				hide_steps();
				// set attendee_information back to auto height 
				$('#spco-attendee_information-dv').css( 'height', 'auto' );
				if ( msg == undefined ) { msg =''; }
				$( '#spco-display-event-questions-lnk' ).trigger('click');
				go_to_step( 'attendee_information', msg );
			},

		// go to payment_options
		payment_options : function ( msg ) {
				hide_steps();
				$('.reg-page-billing-info-dv').addClass('hidden');
				$('.reg-page-payment-option-dv').removeClass('hidden');
				$('#spco-payment_options-dv').css({ 'display' : 'none' }).removeClass('hidden');
				// set payment_options back to auto height 
				$('#spco-payment_options-dv').css( 'height', 'auto' );
				if ( msg == undefined ) { msg =''; }
				go_to_step( 'payment_options', msg );
			},

		// go to registration_confirmation
		registration_confirmation : function ( msg ) {
				hide_steps();
				$('#spco-registration_confirmation-dv').css({ 'display' : 'none' }).removeClass('hidden');		
				// set registration_confirmation back to auto height 
				$('#spco-registration_confirmation-dv').css( 'height', 'auto' );	
				if ( msg == undefined ) { msg =''; }
				go_to_step( 'registration_confirmation', msg );

			},

		// finalize_registration
		finalize_registration : function ( msg ) {
				scroll_to_top_of_form( msg );
			}	

	}




	// go to step 1 via edit link
	$('#single-page-checkout').on( 'click', '.spco-edit-step-lnk', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var step = $(this).attr('rel');
		spco_go_to[ step ]( '' );
		return false;
	});



	// submit registraion form
	$('#single-page-checkout').on( 'click', '.spco-next-step-btn', function(e) {
		e.preventDefault();
		e.stopPropagation();
		// re-enable submit btn in case it was disabled
		$('#spco-go-to-step-finalize_registration-btn').prop( 'disabled', false );
		var step = $(this).attr('rel');
		if ( step != undefined && step != '' ) {
			next_step = get_next_step( step );
			if ( eei18n.wp_debug == 1 ) {
				console.log( JSON.stringify( 'single-page-checkout on click > step; ' + step, null, 4 ));
				console.log( JSON.stringify( 'single-page-checkout on click > next_step: ' + next_step, null, 4 ));
			}
			// disable submit btn
			if ( next_step == 'finalize_registration' ) {
				$( this ).prop( 'disabled', true ).attr( 'rel', '' );
			}
			form_to_check = '#spco-registration-'+step+'-frm';
			if ( next_step == 'finalize_registration' && $('#reg-page-off-site-gateway').val() == 1 ) {
				if ( eei18n.wp_debug == 1 ) {
					console.log( JSON.stringify( 'single-page-checkout on click -> off-site-gateway: ' + $('#reg-page-off-site-gateway').val(), null, 4 ));
				}	
				//$('#spco-registration-'+step+'-frm').submit();
				//return;
			} else if ( step == 'payment_options' ) {
				form_to_check = process_selected_gateway();
			} 
			process_reg_step ( step, next_step, form_to_check );			
		}
		return false;
	});



	function get_next_step( step ) {
		var step_index = _.indexOf( eei18n.reg_steps, step );
		step_index = step_index + 1;
		return eei18n.reg_steps[ step_index ];	
	}



	function process_selected_gateway() {
		
		var selected_gateway = $('#reg-page-selected-gateway').val();
		var off_site_gateway = '#reg-page-gateway-off-site-'+selected_gateway;
		var off_site_payment = $( off_site_gateway ).val(); 
		var selected_gateway_dv = '#reg-page-billing-info-'+selected_gateway+'-dv';

		if ( eei18n.wp_debug == 1 ) {
			console.log( JSON.stringify( 'process_selected_gateway -> selected_gateway: ' + selected_gateway, null, 4 ));
			console.log( JSON.stringify( 'process_selected_gateway -> off_site_gateway: ' + off_site_gateway, null, 4 ));
			console.log( JSON.stringify( 'process_selected_gateway -> off_site_payment: ' + off_site_payment, null, 4 ));
			console.log( JSON.stringify( 'process_selected_gateway -> selected_gateway_dv: ' + selected_gateway_dv, null, 4 ));
		}
		
		// set off-site-gateway status
		if ( off_site_payment == 1 ) {
			$('#reg-page-off-site-gateway').val( 1 );
		} else {
			$('#reg-page-off-site-gateway').val( 0 );
		}
		return selected_gateway_dv;
	}



	/**
	*		submit a step of registraion form
	*/	
	function process_reg_step ( step, next_step, form_to_check ) { 
	
		var good_to_go = verify_all_questions_answered( form_to_check );
		
		if ( good_to_go === true ) {

			$('#spco-'+step+'-noheader').val('true');
			$('#spco-'+step+'-action').attr( 'name', 'action' );		
			var form_data = $('#spco-registration-'+step+'-frm').serialize();
			form_data += '&ee_front_ajax=1';
			form_data += '&step=' + step;
			
//			console.log( JSON.stringify( 'form_data: ' + form_data, null, 4 ));

			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",
				beforeSend: function() {
					do_before_event_queue_ajax();
				}, 
				success: function( response ){
					
					if ( eei18n.wp_debug == 1 ) {
						console.log( JSON.stringify( 'step: ' + step, null, 4 ));
						console.log( JSON.stringify( 'next_step: ' + next_step, null, 4 ));
						console.log( JSON.stringify( 'response.success: ' + response.success, null, 4 ));
						console.log( JSON.stringify( 'response.error: ' + response.error, null, 4 ));
						for ( key in response.return_data ) {
							console.log( JSON.stringify( key +': ' + response.return_data[key], null, 4 ));
						}
					}
					
					if ( response.recaptcha_reload != undefined ) {
						$('#recaptcha_reload').trigger('click');
						show_event_queue_ajax_error_msg( response.error );
					} else if ( response.return_data != undefined ) {
						process_return_data( next_step, response );
					} else {
						if ( response.error != '' && response.error != undefined ) {
							show_event_queue_ajax_error_msg( response.error );
						} else {
							spco_go_to[ next_step ]( response );
						}
					}								
				},
				error: function(response) {
					//console.log( dump( response ) );
					msg = new Object();
					msg.error = eei18n.reg_step_error;
					if ( eei18n.wp_debug == 1 ) {
						msg.error = msg.error + ' ( process_reg_step_' + step + ' )';
					}
					show_event_queue_ajax_error_msg( msg );
					return false;
				}			
			});	

		} else {
			
			// validation errors 
			$( form_to_check ).slideDown();
			scroll_to_top_of_form( good_to_go );
			return false;
			
		}
		
		return false;
				
	}

		


	function process_return_data( next_step, response ) {
//alert('process_return_data');
		for ( key in response.return_data ) {
			//alert( 'key = ' + key + '\n' + 'response.return_data[key] = ' + response.return_data[key] );
			if ( key == 'reg-page-confirmation-dv' ) {
				$( '#reg-page-confirmation-dv' ).html( response.return_data[key] );
			} else if ( key == 'redirect-to-thank-you-page' ) {
				window.location.replace( response.return_data[key] );
				console.log( JSON.stringify( key +': ' + response.return_data[key], null, 4 ));
				return;
			} else if ( key == 'off-site-redirect') {
				$( '#spco-extra-finalize_registration-inputs-dv' ).html( response.return_data[key] );
				document.forms['gateway_form'].submit();
			}
		}

		msg = new Object();
		msg.success = response.success;
		spco_go_to[ next_step ](  msg  );

	}



	/**
	*		validate_email_address
	*/
	function validate_email_address (email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}



	/**
	*		show reg page copy attendee error msg
	*/
	function verify_all_questions_answered( whch_form ) {

		if ( $('#reg-page-no-payment-required').val() == 1 ) {
			return true;
		}

		 if ( whch_form == '' ){
			whch_form = '#spco-registration-' + eei18n.reg_step_1 + '-frm';
		}
		
//		console.log( JSON.stringify( 'whch_form: ' + whch_form, null, 4 ));
			
		var good_to_go = true;
		
		$( whch_form + ' .required' ).each( function(index) {

//			console.log( JSON.stringify( 'input_id: ' + $(this).attr('id'), null, 4 ));
//			console.log( JSON.stringify( 'input value: ' + $(this).val(), null, 4 ));		
			
			// empty field
			if ( $(this).val() == '' ) {
			
				// set error messages
				if ( good_to_go === true ) {
					good_to_go = eei18n.answer_required_questions;
					if ( eei18n.wp_debug == 1 ) {
						good_to_go = good_to_go + ' ( verify_all_questions_answered )';
					}
					return false;
				} else if ( good_to_go == eei18n.enter_valid_email ) {
					good_to_go = eei18n.valid_email_and_questions;
					if ( eei18n.wp_debug == 1 ) {
						good_to_go = good_to_go + ' ( verify_all_questions_answered )';
					}
					return false;
				} 
				
				$(this).addClass('requires-value');
				
			} else {
				
				// is this field an email address ?
				if ( $(this).hasClass('email') ) {
					// grab the addy
					var email_address = $(this).val();
					// send addy for validation
					if ( validate_email_address( email_address )) {
						// good email addy
						$(this).removeClass('requires-value');
					} else {
						// bad email addy
						$(this).addClass('requires-value');
						// set error messages
						if ( good_to_go === true ) {
							good_to_go = eei18n.enter_valid_email;
							if ( eei18n.wp_debug == 1 ) {
								good_to_go = good_to_go + ' ( verify_all_questions_answered )';
							}
							return false;
						}  else if ( good_to_go == eei18n.answer_required_questions ) {
							good_to_go = eei18n.valid_email_and_questions;
							if ( eei18n.wp_debug == 1 ) {
								good_to_go = good_to_go + ' ( verify_all_questions_answered )';
							}
							return false;
						} 			
					}								
							
				} else {
					$(this).removeClass('requires-value');
				}			
				
			}	
		});
		
			
		// does copy all attendees checkbox exist ?
		if ( $('#spco-copy-all-attendee-chk').size() ) {
			// get value of copy all attendees checkbox
			var allAttendeesChk = $('#spco-copy-all-attendee-chk').prop('checked');
		} else {
			// only one attendee, so let's say this is checked
			var allAttendeesChk = true;
		}		
		
		if ( good_to_go === true && allAttendeesChk ) {
			$('.espresso-question-group-wrap').slideUp(); 
			$('#spco-copy-attendee-dv').slideUp();
			$('#spco-auto-copy-attendee-pg').slideUp();
			$('#spco-display-event-questions-lnk').removeClass('hidden');
		} else if ( good_to_go != '' && good_to_go != true ) {
			msg = new Object();
			msg.error = good_to_go;
			good_to_go = msg;
		}

		return good_to_go;
				
	}



	// show event questions
	$('#spco-display-event-questions-lnk').on( 'click', function() {
		$('.espresso-question-group-wrap').slideDown();
		$('#spco-copy-attendee-dv').slideDown();
		$(this).addClass('hidden');
	});




	$('.reg-page-payment-option-dv').on( 'click', function() {
	
		var selected_payment_option = $(this).find('.reg-page-payment-option-lnk');
		var selected_gateway = selected_payment_option.attr('id');
		$('#reg-page-select-other-gateway-lnk').attr( 'rel', selected_gateway );
		
		$('#methods-of-payment').slideUp( 250, function() {

			$('.reg-page-payment-option-dv').each(function() {
//				if ( $(this).find('.reg-page-payment-option-lnk').attr('id') != selected_gateway ) {
					$(this).toggleClass( 'hidden' );
//				} else {
//					alert( 'selected_payment_option = ' + selected_payment_option + '\n' + 'selected_gateway = ' + selected_gateway );
//				}		
			});		
			// get target element from "this" (the control element's) "rel" attribute
			var gateway_form = 'reg-page-billing-info-' + selected_payment_option.attr("rel"); 	
			$('#reg-page-selected-gateway').val( selected_payment_option.attr("rel") );
			$('#'+gateway_form+'-dv').toggleClass( 'hidden' );
			$('#hide-'+gateway_form).removeClass('hidden');			
			$('#reg-page-select-other-gateway-lnk').toggleClass( 'hidden' );
			$('#select-method-of-payment-hdr').toggleClass( 'hidden' );
			$('#methods-of-payment').slideDown( 500 );

			

		});		

		return false;
		
	});



	$('#reg-page-select-other-gateway-lnk').on( 'click', function() {
		selected_gateway = '#' + $(this).attr('rel');
		$(this).attr('rel', '');
		$( selected_gateway ).trigger('click');
		return false;
	});


	function getFunctionName( functionName ) {
		functionName = functionName.substr('function '.length);
		functionName = functionName.substr(0, functionName.indexOf('('));	
		return functionName;
	}


})(jQuery);

