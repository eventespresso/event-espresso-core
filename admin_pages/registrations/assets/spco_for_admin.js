(function($) {

	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {});
	
	//	var date_tester = document.createElement( 'input' );
	// date_tester.setAttribute( 'type', 'date' );
	// if type is text then and only then should you call the fallback
	/*if( date_tester.type === 'text' ){
		$( '#date' ).datepicker({
			dateFormat: 'dd-mm-yy'
		});
	}/**/

	$('#spco-copy-all-attendee-chk').prop( 'checked', false );



	// Step 1 - "more options" link in the "Use Attendee #1's information for ALL attendees" box
	$('#display-more-attendee-copy-options').on( 'click', function() {
		$('#spco-copy-all-attendee-chk').prop('checked', false);
	});



	/**
	*		trigger click event on all checkboxes if the Copy All option is selected
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
		} else {
			show_event_queue_ajax_error_msg( eei18n.attendee_info_copied );
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
			
			if ( typeof(input_id) !== 'undefined' ) {
				// split the above var
				var input_id_array =  input_id.split('-');
//				console.log( JSON.stringify( 'input_id_array: ' + input_id_array, null, 4 ));
	
				// grab the current input's details
				var att_nmbr = input_id_array[0];
				var line_item_id = input_id_array[1];
				var input_name = input_id_array[2];
				// and it's value'
				input_value = $(this).val();
//				console.log( JSON.stringify( 'input_id: ' + input_id, null, 4 ));
//				console.log( JSON.stringify( 'input_name: ' + input_name, null, 4 ));
//				console.log( JSON.stringify( 'event_id: ' + event_id, null, 4 ));
							
				// if the input is required but has not been filled out
				if ( $(this).hasClass('required') && input_value === '' ) {
				
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
					return;
				
				} else {
	
					new_input_id = '#' + trgt_att_input + '-' +  input_name;
//					if ( answer_id != undefined ) {
//						new_input_id = new_input_id + '-' + answer_id;
//					}
//					console.log( JSON.stringify( 'new_input_id: ' + new_input_id, null, 4 ));
					
					if ( $(new_input_id).length > 0 ){
						if ( $(new_input_id).is(':radio') && $('#' + input_id).is(':checked') === true ) {
							$(new_input_id).prop('checked', true);
						} else if ( $(new_input_id).is(':checkbox') && $('#' + input_id).is(':checked') === true ) {
							$(new_input_id).prop('checked', true);
						} else {
							$(new_input_id).val(input_value);
						}
					}
	
					var billing = '#reg-page-billing-' + input_name;
					// copy to billing info
					if ( $(billing).val() === '' ) {
						$(billing).val(input_value);
					}				}
			}

		});
	});
	
		
	
	/**
	*		do_before_event_queue_ajax
	*/
	function do_before_event_queue_ajax() {
		// stop any message alerts that are in progress
		$('.espresso-ajax-notices').stop();
		$('#espresso-ajax-loading').eeCenter().show();
	}



	/**
	*		show event queue ajax success msg
	*/
	function show_event_queue_ajax_success_msg( success_msg ) {
		
		if ( typeof(success_msg) !== 'undefined' && success_msg !== '' )  {
			if ( typeof(success_msg.success) !== 'undefined' ) {
				success_msg = success_msg.success;
			}
			$('#espresso-ajax-loading').fadeOut('fast');
			$('#espresso-ajax-notices').eeCenter();
			$('#espresso-ajax-notices-success > .espresso-notices-msg').html( success_msg );
			$('#espresso-ajax-notices-success').removeClass('hidden').show().delay(4000).fadeOut();
		} else {
			$('#espresso-ajax-loading').fadeOut('fast');
		}
	}



	/**
	*		show event queue ajax error msg
	*/
	function show_event_queue_ajax_error_msg( error_msg ) {
			
		if ( typeof(error_msg) !== 'undefined' && error_msg !== '' ) {
			
			if ( typeof( error_msg ) === 'object' && typeof(error_msg.error) !== 'undefined' && error_msg.error !== '' ) {
				error_msg = error_msg.error;
			}
						
			$('#espresso-ajax-notices').eeCenter();
			$('#espresso-ajax-notices-error > .espresso-notices-msg').html( error_msg );
			$('#espresso-ajax-loading').fadeOut('fast');
			$('#espresso-ajax-notices-error').removeClass('hidden').show().delay(10000).fadeOut();

		} else {
			$('#espresso-ajax-loading').fadeOut('fast');
		}
	}
	
	// remove "requires-value" class if field is no longer empty
	$('input[type="text"]').focusout(function() {
		if ( $.trim(this.value) !== '' ){
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

		if ( whch_form === '' ){
			whch_form = '#spco-registration-' + eei18n.reg_step_1 + '-frm';
		}
		//console.log( JSON.stringify( 'whch_form: ' + whch_form, null, 4 ));
		
		var good_to_go = true;
		
		$( whch_form + ' .required' ).each( function(index) {

			//console.log( JSON.stringify( 'input_id: ' + $(this).attr('id'), null, 4 ));
			
			// empty field
			if ( $(this).val() ==- '' ) {
			
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
		var allAttendeesChk = true;
		if ( $('#spco-copy-all-attendee-chk').size() ) {
			// get value of copy all attendees checkbox
			allAttendeesChk = $('#spco-copy-all-attendee-chk').prop('checked');
		}
		
		if ( good_to_go === true && allAttendeesChk ) {
			$('.espresso-question-group-wrap').slideUp();
			$('#spco-copy-attendee-dv').slideUp();
			$('#spco-display-event-questions-lnk').removeClass('hidden');
		} else if ( good_to_go !== '' && good_to_go !== true ) {
			msg = {};
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



	function getFunctionName( functionName ) {
		functionName = functionName.substr('function '.length);
		functionName = functionName.substr(0, functionName.indexOf('('));
		return functionName;
	}

})(jQuery);