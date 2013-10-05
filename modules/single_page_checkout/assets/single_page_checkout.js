(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {}); 


	//$('#mer-registration-frm-1').validate();

	
	//close btn for notifications
//	$('.close-event-queue-msg').on( 'click', function(){
//		$(this).parent().hide();
//	});



	// apply coupon button
	$('#mer-reg-page-apply-coupon-btn').on( 'click', function() {
		var error_msg = eei18n.invalid_coupon;
		if ( eei18n.wp_debug == 1 ) {
			error_msg = error_msg + ' (' + getFunctionName( arguments.callee.toString() ) + ' )';
		}
		show_event_queue_ajax_error_msg( error_msg );
		return false;
	});



	// Step 1 - "more options" link in the "Use Attendee #1's information for ALL attendees" box
	$('#display-more-attendee-copy-options').on( 'click', function() {
		$('#mer-reg-page-copy-all-attendee-chk').prop('checked', false);
	});



	/**
	*		trigger click event on all checkboxes if the Copy All option is selected
	*/
	$('#mer-reg-page-copy-all-attendee-chk').on( 'click', function() {
		$('.mer-reg-page-copy-attendee-chk').each(function(index) {
			if ( $(this).prop('checked') != $('#mer-reg-page-copy-all-attendee-chk').prop('checked') ) {
				$(this).trigger('click');
			}
		});
		var good_to_go = verify_all_questions_answered('#mer-registration-frm-1');		
		if ( good_to_go !== true ) {
			show_event_queue_ajax_error_msg( good_to_go );
		}
	});
	

	
	
	// in
	$('.mer-reg-page-copy-attendee-chk').on( 'click', function() { 

		// the checkbox that was clicked
		var clicked_checkbox = $(this);
		
		// the primary attendee question group
		var prmry_att_qstn_grp = $(this).val();
//		console.log( JSON.stringify( 'prmry_att_qstn_grp: ' + prmry_att_qstn_grp, null, 4 ));
		// find all of the primaray attendee's questions for this event
		var prmry_att_questions = $( '#mer-reg-page-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find('input');		
		//$( '#mer-reg-page-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find('input').css('background','pink');		

		// the targeted attendee question group
		var trgt_att_qstn_grp = $(this).attr('rel');
//		console.log( JSON.stringify( 'trgt_att_qstn_grp: ' + trgt_att_qstn_grp, null, 4 ));
		
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
//				console.log( input_id_array );
	
				// grab the current event id
				var event_id = input_id_array[0];		 
				var att_nmbr = input_id_array[1];		 
				var event_date = input_id_array[2];		 
				var event_time = input_id_array[3];		 
				var ticket_price = input_id_array[4];		 
				var input_name = input_id_array[5];		 
				var answer_id = input_id_array[6];		 
				
//				input_name = $(this).attr('name');
				input_value = $(this).val();
//				console.log( JSON.stringify( 'input_id: ' + input_id, null, 4 ));
//				console.log( JSON.stringify( 'input_name: ' + input_name, null, 4 ));
//				console.log( JSON.stringify( 'event_id: ' + event_id, null, 4 ));
							
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
						error_msg = error_msg + ' ( mer-reg-page-copy-attendee-chk )';
					}
					show_event_queue_ajax_error_msg( error_msg );	
					// uncheck the checkbox that was clicked
					$(clicked_checkbox).prop('checked', false);
					// fill out yer dang form will ya!!!
					exit;			
				
				} else {
	
					new_input_id = '#' + trgt_att_qstn_grp + '-' +  input_name;
					if ( answer_id != undefined ) {
						new_input_id = new_input_id + '-' + answer_id;
					}
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
		var top_of_form = $('#mer-reg-page-steps-display-dv').offset();
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
	function hide_step(step_to_hide){
		$('#mer-reg-page-step-'+step_to_hide+'-dv').slideUp( function() {				
			$('#mer-reg-page-step-'+step_to_hide+'-dv').height(0);
			$('#mer-reg-page-edit-step-'+step_to_hide+'-lnk').removeClass('hidden');		
			
		});	
	}
	
	/**
	 * opens the the SPCO step specified by step_to_show
	 * shows msg as a notification
	 * @param int step_to_show either step 1, 2, or 3
	 * @param string msg message to show
	 * @return void
	 **/
	function go_to_step(step_to_show,msg){
		$('.mer-reg-page-step-display-dv').removeClass('active-step').addClass('inactive-step');	
		$('#mer-reg-page-step-'+step_to_show+'-display-dv').removeClass('inactive-step').addClass('active-step');
		$('#mer-reg-page-edit-step-'+step_to_show+'-lnk').addClass('hidden');	
		$('#espresso-ajax-loading').fadeOut('fast');
		$('#mer-reg-page-step-'+step_to_show+'-dv').css('display','none').removeClass('hidden').slideDown( function() {
			scroll_to_top_of_form( msg );
		});
	}
	
	
	
	// go to step 1
	function mer_reg_page_go_to_step_1( msg ) {	
	
		if ( msg == undefined ) {
			msg ='';
		}
		// set step 1 back to auto height 
		$('#mer-reg-page-step-1-dv').css( 'height', 'auto' );
		hide_step(2);
		hide_step(3);
		go_to_step(1,msg);
	}



	// go to step 2
	function mer_reg_page_go_to_step_2( msg ) {	

		if ( msg == undefined ) {
			msg ='';
		}
		$('.reg-page-billing-info-dv').addClass('hidden');
		$('.reg-page-payment-option-dv').removeClass('hidden');
		//	$('.mer-reg-page-go-to-step-2').on( 'click', function() {
		$('#mer-reg-page-step-2-dv').css({ 'display' : 'none' }).removeClass('hidden');
		// set step 2 back to auto height 
		$('#mer-reg-page-step-2-dv').css( 'height', 'auto' );
		hide_step(1);
		hide_step(3);
		go_to_step(2,msg);
	}



	// go to step 3
	function mer_reg_page_go_to_step_3( msg ) {	

		if ( msg == undefined ) {
			msg ='';
		}

		$('#mer-reg-page-step-3-dv').css({ 'display' : 'none' }).removeClass('hidden');		
		// set step 3 back to auto height 
		$('#mer-reg-page-step-3-dv').css( 'height', 'auto' );	
		hide_step(1);
		hide_step(2);
		go_to_step(3,msg);

	}



	// go to step 4
	function mer_reg_page_go_to_step_4( msg ) {
		scroll_to_top_of_form( msg );
	}	



	// go to step 1 via edit link
	$('.mer-reg-page-go-to-step-1').on( 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		mer_reg_page_go_to_step_1('');
		return false;
	});
	
	// go to step 2 via edit link
	$('.mer-reg-page-go-to-step-2').on( 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		mer_reg_page_go_to_step_2('');
		return false;
	});

	// go to step 3 via edit link
	$('.mer-reg-page-go-to-step-3').on( 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		selected_gateway_dv = process_selected_gateway();		
		process_reg_step ( 2, selected_gateway_dv );
		return false;
	});

	
	// submit Step 1 of registraion form
	$('#mer-reg-page-go-to-step-2-btn').on( 'click', function(e) {	
		e.preventDefault();
		e.stopPropagation();
		process_reg_step ( 1 );
	});
		
	
	// submit Step 2 of registraion form
	$('#mer-reg-page-go-to-step-3-btn').on( 'click', function(e) {	
		e.preventDefault();
		e.stopPropagation();
		selected_gateway_dv = process_selected_gateway();
		process_reg_step ( 2, selected_gateway_dv );
	});
		
	
	// submit Step 3 of registraion form
	$('#mer-reg-page-confirm-reg-btn').on( 'click', function(e) {	
		e.preventDefault();
		e.stopPropagation();
		off_site_payment = $('#reg-page-off-site-gateway').val();
		if ( off_site_payment == 1 ) {
			$('#mer-registration-frm-3').submit();
		} else {
			process_reg_step ( 3 );
		}		
		
	});



	function process_selected_gateway() {
		
		var selected_gateway = $('#reg-page-selected-gateway').val();
		var off_site_gateway = '#reg-page-gateway-off-site-'+selected_gateway;
		var off_site_payment = $( off_site_gateway ).val(); 
		var selected_gateway_dv = '#reg-page-billing-info-'+selected_gateway+'-dv';
		//alert( 'selected_gateway : ' + selected_gateway + '\n' + 'off_site_gateway : ' + off_site_gateway + '\n' + 'off_site_payment : ' + off_site_payment + '\n' + 'selected_gateway_dv : ' + selected_gateway_dv );
		
		// set off-site-gateway status
		if ( off_site_payment == 1 ) {
			$('#reg-page-off-site-gateway').val( 1 );
		} else {
			$('#reg-page-off-site-gateway').val( 0 );
		}
		return selected_gateway_dv;
	}



	function mer_reg_page_go_to( step, response ) {
	
		if ( response.error != '' && response.error != undefined ) {
			show_event_queue_ajax_error_msg( response.error );
		} else {
			if ( step == 2 ) {
				mer_reg_page_go_to_step_2( response );
			} else if ( step == 3 ) {
				mer_reg_page_go_to_step_3( response );
			} else if ( step == 4 ) {
				mer_reg_page_go_to_step_4( response );
			}  		
		}	

	}



	/**
	*		submit a step of registraion form
	*/	
	function process_reg_step ( step, form_to_check ) { //, off_site_payment
		
		if ( form_to_check == '' || form_to_check == undefined ) {
			form_to_check = '#mer-registration-frm-'+step;
		}
		
		var good_to_go = verify_all_questions_answered( form_to_check );

		if ( good_to_go === true ) {

			$('#mer-reg-page-step-'+step+'-ajax').val(1);
			$('#mer-reg-page-step-'+step+'-noheader').val('true');
			$('#mer-reg-page-step-'+step+'-action').attr( 'name', 'action' );		
			var form_data = $('#mer-registration-frm-'+step).serialize();
			form_data.ee_front_ajax = true;
//alert	(form_data);
//alert( '#mer-reg-page-step-'+step+'-action = ' + $('#mer-reg-page-step-'+step+'-action').val() );
//alert( 'eei18n.ajax_url = ' + eei18n.ajax_url );

			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",
				beforeSend: function() {
					do_before_event_queue_ajax();
				}, 
				success: function(response){	
					var next = parseInt(step) + 1;
//					console.log( JSON.stringify( 'step: ' + step, null, 4 ));
//					console.log( JSON.stringify( 'response.return_data: ' + response.return_data, null, 4 ));
//					console.log( JSON.stringify( 'response.success: ' + response.success, null, 4 ));
//					console.log( JSON.stringify( 'response.error: ' + response.error, null, 4 ));
					if ( response.return_data != undefined ) {
						process_return_data( next, response );
					} else {
						mer_reg_page_go_to( next, response );						
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



	function process_return_data( next, response ) {
//alert('process_return_data');
		for ( key in response.return_data ) {
			//alert( 'key = ' + key + '\n' + 'response.return_data[key] = ' + response.return_data[key] );
			if ( key == 'reg-page-confirmation-dv' ) {
				$( '#reg-page-confirmation-dv' ).html( response.return_data[key] );
			} else if ( key == 'redirect-to-thank-you-page' ) {
				window.location.replace( response.return_data[key] );
				return;
			} else if ( key == 'off-site-redirect') {
				$( '#reg-page-confirmation-dv-and-whats-next-button' ).html( response.return_data[key] );
				document.forms['gateway_form'].submit();
			}
		}

		msg = new Object();
		msg.success = response.success;
		mer_reg_page_go_to( next, msg );

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
			whch_form = '#mer-registration-frm-1';
		}
//		alert( 'whch_form = '+whch_form );
		
		var good_to_go = true;
		
		$( whch_form + ' .required' ).each( function(index) {

//			console.log( JSON.stringify( 'input_id: ' + $(this).attr('id'), null, 4 ));
			
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
		if ( $('#mer-reg-page-copy-all-attendee-chk').size() ) {
			// get value of copy all attendees checkbox
			var allAttendeesChk = $('#mer-reg-page-copy-all-attendee-chk').prop('checked');
		} else {
			// only one attendee, so let's say this is checked
			var allAttendeesChk = true;
		}		
		
		if ( good_to_go === true && allAttendeesChk ) {
			$('.espresso-question-group-wrap').slideUp(); 
			$('#mer-reg-page-copy-attendee-dv').slideUp();
			$('#mer-reg-page-display-event-questions-lnk').removeClass('hidden');
		} else if ( good_to_go != '' && good_to_go != true ) {
			msg = new Object();
			msg.error = good_to_go;
			good_to_go = msg;
		}

		return good_to_go;
				
	}



	// show event questions
	$('#mer-reg-page-display-event-questions-lnk').on( 'click', function() {
		$('.espresso-question-group-wrap').slideDown();
		$('#mer-reg-page-copy-attendee-dv').slideDown();
		$(this).addClass('hidden');
	});




	$('.reg-page-payment-option-dv').on( 'click', function() {
	
		var selected_payment_option = $(this).find('.reg-page-payment-option-lnk');
		var selected_gateway = selected_payment_option.attr('id');
		$('#reg-page-select-other-gateway-lnk').attr( 'rel', selected_gateway );
		
		$('#methods-of-payment').slideUp( 250, function() {

			$('.reg-page-payment-option-dv').each(function() {
				if ( $(this).find('.reg-page-payment-option-lnk').attr('id') != selected_gateway ) {
					$(this).toggleClass( 'hidden' );
				}			
			});		
			// get target element from "this" (the control element's) "rel" attribute
			var gateway_form = 'reg-page-billing-info-' + selected_payment_option.attr("rel"); 	
			$('#reg-page-selected-gateway').val( selected_payment_option.attr("rel") );
			$('#'+gateway_form+'-dv').toggleClass( 'hidden' );
			$('#hide-'+gateway_form).removeClass('hidden'); 
			$('#reg-page-select-other-gateway-lnk').toggleClass( 'hidden' );
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

