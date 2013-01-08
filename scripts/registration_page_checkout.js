(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {}); 


	// move notifications from top of reg form to just before closing body tag
	// so that notifications can easily be centered on screen regardless of resolution or scroll position
	var notifications = $('#multi-event-registration-notifications').html();
	$('#multi-event-registration-notifications').html('');
	$('body').append( notifications );
	

	
	// add jQuery function to center elements on screen
	$.fn.center = function () {
		this.css({ 'position' : 'absolute' });
		var element_top = Math.max( 0, ((( $(window).height() / 2 ) - this.outerHeight() ) / 2 )  + $(window).scrollTop() );
		var element_left = Math.max( 0, (( $(window).width() - this.outerWidth() ) / 2 ) + $(window).scrollLeft() );
		this.css({ 'top' : element_top + 'px' });
		this.css({ 'left' : element_left + 'px' });
		if ( $(window).width() > 600 ) {
			this.css({ 'max-width' : '600px' });
		}
		return this;
	}



	$('.show-if-js').css({ 'display' : 'inline-block' });
	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );


	
	//close btn for notifications
	$('.close-event-queue-msg').on( 'click', function(){
		$(this).parent().hide();
	});



	// apply coupon button
	$('#mer-reg-page-apply-coupon-btn').on( 'click', function() {
		var error_msg = "We're sorry but that coupon code does not appear to be vaild. If this is incorrect, please contact the site administrator.";
		show_event_queue_ajax_error_msg( error_msg );
		return false;
	});



	// Step 1 - "more options" link in the "Use Attendee #1's information for ALL attendees" box
	$('#display-more-attendee-copy-options').on( 'click', function() {
		if ( $('#mer-reg-page-copy-all-attendee-chk').prop('checked', true) ) {
			$('#mer-reg-page-copy-all-attendee-chk').trigger('click');
			//$('.mer-reg-page-copy-attendee-chk').trigger('click');
		}
	});



	/**
	*		trigger click event on all checkboxes if the Copy All option is selected
	*/
	$('#mer-reg-page-copy-all-attendee-chk').on( 'click', function() {
		$('.mer-reg-page-copy-attendee-chk').each(function(index) {
			if ( $(this).prop('checked') != $('#mer-reg-page-copy-all-attendee-chk').prop('checked') ) {
				$(this).trigger('click');
			}
			//$('.mer-reg-page-copy-attendee-chk').trigger('click');
		});
		var good_to_go = verify_all_questions_answered('#mer-registration-frm-1');
		
		if ( good_to_go != true && good_to_go != '' && typeof( error_msg ) === 'object' ) {
			show_event_queue_ajax_error_msg( good_to_go );
		}
	});
	

	
	
	// in
	$('.mer-reg-page-copy-attendee-chk').on( 'click', function() { 

		// the checkbox that was clicked
		var clicked_checkbox = $(this);
		
		// the primary attendee question group
		var prmry_att_qstn_grp = $(this).val();
		// find all of the primaray attendee's questions for this event
		var prmry_att_questions = $( '#mer-reg-page-attendee-wrap-' + prmry_att_qstn_grp ).children( '.event_questions' ).find('input');		
		//$( '#mer-reg-page-attendee-wrap-' + prmry_att_qstn_grp ).children( '.event_questions' ).find('input').css('background','pink');		

		// the targeted attendee question group
		var trgt_att_qstn_grp = $(this).attr('rel');
		//alert ( 'trgt_att_qstn_grp = ' + trgt_att_qstn_grp );
		
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
	
				// grab the current event id
				var event_id = input_id_array[0];		 
				
				input_name = $(this).attr('name');
				input_value = $(this).val();
				
				//alert ( 'input_id = ' + input_id + '\n' + 'input_name = ' + input_name  + '\n' + 'event_id = ' + event_id  ); // + '\n' + 'att_nmbr = ' + trgt_att_nmbr
							
				// if the input is required but has not been filled out
				if ( $(this).hasClass('required') && input_value == '' ) {  
				
					$(this).addClass('requires-value');
					// find label for this input
					var lbl = $(this).prev('label');
					// grab it's text
					var lbl_txt = $(lbl).html();
					//alert(lbl_txt);
					// remove "<em>*</em>" from end
					lbl_txt = lbl_txt.substring(0, lbl_txt.length - 10);
					// show an error msg
					var error_msg = 'The ' + lbl_txt + ' input is a required field. Please enter a value for this field and all other required fields before preceeding.';
					//show_reg_page_copy_attendee_error( event_id, error_msg );	
					show_event_queue_ajax_error_msg( error_msg );	
					// uncheck the checkbox that was clicked
					$(clicked_checkbox).prop('checked', false);
					// fill out yer damn form will ya!!!
					exit;			
				
				} else {
	
					new_input_id = '#' + trgt_att_qstn_grp + '-' +  input_id_array[5];
	//				alert ( 'new_input_id = ' + new_input_id  ); // + '\n' + 'att_nmbr = ' + trgt_att_nmbr
					
					if ( $(new_input_id).length > 0 ){
						$(new_input_id).val(input_value);
					}
	
					var billing = '#reg-page-billing-' + input_id_array[5];
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
		$('.event-queue-msg').stop();
		$('#mer-ajax-loading').center().show();		
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

			$('#mer-success-msg').center();	
			$('#mer-success-msg > .msg').html( success_msg );
			$('#mer-ajax-loading').fadeOut('fast');
			$('#mer-success-msg').removeClass('hidden').show().delay(4000).fadeOut();			
		} else {
			$('#mer-ajax-loading').fadeOut('fast');
		}	
	}	



	/**
	*		show event queue ajax error msg
	*/	
	function show_event_queue_ajax_error_msg( error_msg ) {
			
		if ( error_msg != undefined && error_msg != '' ) {
			//alert( 'typeof( error_msg ) = '+ typeof( error_msg ) );
			
			if ( typeof( error_msg ) === 'object' && error_msg.error != undefined && error_msg.error != '' ) {
				error_msg = error_msg.error;				
			} 
			//alert( '209) show_event_queue_ajax_error_msg = '+ error_msg);
						
			$('#mer-error-msg').center();				
			$('#mer-error-msg > .msg').html( error_msg );
			$('#mer-ajax-loading').fadeOut('fast');
			$('#mer-error-msg').removeClass('hidden').show().delay(8000).fadeOut();

		} else {
			$('#mer-ajax-loading').fadeOut('fast');
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



	// Registration Steps

	// hide and display steps
	function hide_step_goto( step_to_hide, step_to_show, msg ) {
		//alert('hide_step '+step_to_hide+', goto '+step_to_show);
		$('#mer-reg-page-step-'+step_to_hide+'-dv').slideUp( function() {				
			$('#mer-reg-page-step-'+step_to_hide+'-dv').height(0);
			$('#mer-reg-page-edit-step-'+step_to_hide+'-lnk').removeClass('hidden');		
			$('#mer-reg-page-step-'+step_to_show+'-dv').css('display','none').removeClass('hidden').slideDown( function() {
				scroll_to_top_of_form( msg );
			});
		});	
		$('.mer-reg-page-step-display-dv').removeClass('active-step').addClass('inactive-step');	
		$('#mer-reg-page-step-'+step_to_show+'-display-dv').removeClass('inactive-step').addClass('active-step');
		$('#mer-reg-page-edit-step-'+step_to_show+'-lnk').addClass('hidden');	
		$('#mer-ajax-loading').fadeOut('fast');
	}
	
	
	
	// go to step 1
	function mer_reg_page_go_to_step_1( msg ) {	
	
		if ( msg == undefined ) {
			msg ='';
		}
		// set step 1 back to auto height 
		$('#mer-reg-page-step-1-dv').css( 'height', 'auto' );
		// if step 2 is expanded 
		if ( $('#mer-reg-page-step-2-dv').height() > 0 ) {
			// hide step 2
			hide_step_goto( 2, 1, msg );
		} else {
			// must be step 3 that is expanded
			hide_step_goto( 3, 1, msg );
		}	
	}



	// go to step 2
	function mer_reg_page_go_to_step_2( msg ) {	

		if ( msg == undefined ) {
			msg ='';
		}
		$('.reg-page-billing-info-dv').addClass('hidden');
		$('.reg-page-payment-option-lnk').removeClass('hidden');
		//	$('.mer-reg-page-go-to-step-2').on( 'click', function() {
		$('#mer-reg-page-step-2-dv').css({ 'display' : 'none' }).removeClass('hidden');
		// set step 2 back to auto height 
		$('#mer-reg-page-step-2-dv').css( 'height', 'auto' );
		// if step 1 is expanded
		if ( $('#mer-reg-page-step-1-dv').height() > 0 ) {
			// hide step 1		
			hide_step_goto( 1, 2, msg );	
		} else {		
			// must be step 3 that is expanded
			hide_step_goto( 3, 2, msg );		
		}	
	}



	// go to step 3
	function mer_reg_page_go_to_step_3( msg ) {	

		if ( msg == undefined ) {
			msg ='';
		}

		$('#mer-reg-page-step-3-dv').css({ 'display' : 'none' }).removeClass('hidden');		
		// set step 3 back to auto height 
		$('#mer-reg-page-step-3-dv').css( 'height', 'auto' );	
		// if step 1 is expanded
		if ( $('#mer-reg-page-step-1-dv').height() > 0 ) {
			// hide step 1		
			hide_step_goto( 1, 3, msg );	
		} else {
			// must be step 2 that is expanded
			hide_step_goto( 2, 3, msg );	
		}	

	}



	// go to step 4
	function mer_reg_page_go_to_step_4( msg ) {
		scroll_to_top_of_form( msg );
	}	



	// go to step 1 via edit link
	$('.mer-reg-page-go-to-step-1').on( 'click', function() {
		mer_reg_page_go_to_step_1('');
		return false;
	});
	
	// go to step 2 via edit link
	$('.mer-reg-page-go-to-step-2').on( 'click', function() {
		mer_reg_page_go_to_step_2('');
		return false;
	});

	// go to step 3 via edit link
	$('.mer-reg-page-go-to-step-3').on( 'click', function() {
		selected_gateway_dv = process_selected_gateway();		
		process_reg_step ( 2, selected_gateway_dv );
		return false;
	});

	
	// submit Step 1 of registraion form
	$('#mer-reg-page-go-to-step-2-btn').on( 'click', function() {	
		process_reg_step ( 1 );
	});
		
	
	// submit Step 2 of registraion form
	$('#mer-reg-page-go-to-step-3-btn').on( 'click', function() {	
		selected_gateway_dv = process_selected_gateway();
		process_reg_step ( 2, selected_gateway_dv );
	});
		
	
	// submit Step 3 of registraion form
	$('#mer-reg-page-confirm-reg-btn').on( 'click', function() {	

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
//		alert( '433) good_to_go = ' + good_to_go );

		if ( good_to_go === true ) {

			$('#mer-reg-page-step-'+step+'-ajax').val(1);
			$('#mer-reg-page-step-'+step+'-noheader').val('true');
			$('#mer-reg-page-step-'+step+'-action').attr( 'name', 'action' );		
			var form_data = $('#mer-registration-frm-'+step).serialize();
//alert	(form_data);
//alert( '#mer-reg-page-step-'+step+'-action = ' + $('#mer-reg-page-step-'+step+'-action').val() );
//alert( 'event_espresso.ajax_url = ' + event_espresso.ajax_url );


			$.ajax({
						type: "POST",
						url:  event_espresso.ajax_url,
						data: form_data,
						dataType: "json",
						beforeSend: function() {
							do_before_event_queue_ajax();
						}, 
						success: function(response){	
							var next = parseInt(step) + 1;
							//alert( 'step = ' + step + '\n' + 'response.return_data = ' + response.return_data + '\n' + 'response.success = ' + response.success + '\n' + 'response.error = ' + response.error );
							if ( response.return_data != undefined ) {
								process_return_data( next, response );
							} else {
								mer_reg_page_go_to( next, response );						
							}								
						},
						error: function(response) {
							//alert( dump( response ) );
							msg = new Object();
							msg.error = 'An error occured! Registration Step '+step+' could not be completed. Please refresh the page and try again.';
							show_event_queue_ajax_error_msg( msg );
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
				$( '#reg-page-confirmation-dv' ).html( response.return_data[key] );
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
		//alert( 'whch_form = '+whch_form );
		
		var good_to_go = true;
		
		$( whch_form + ' .required' ).each( function(index) {
			//alert( $(this).attr('id') );
			
			// empty field
			if ( $(this).val() == '' ) {
			
				// set error messages
				if ( good_to_go === true ) {
					good_to_go = 'You need to answer all required questions before you can proceed.';
				} else if ( good_to_go == 'You must enter a valid email address.' ) {
					good_to_go = 'You must enter a valid email address and answer all other required questions before you can proceed.';
				} 
				
				$(this).addClass('requires-value');
				
			} else {
				
				// is this field an email address ?
				if ( $(this).prev().attr('for') == 'email' ) {
					// grab the addy
					var email_address = $(this).val();
					// send addy for validation
					if ( validate_email_address( email_address ) ) {
						// good email addy
						$(this).removeClass('requires-value');
					} else {
						// bad email addy
						$(this).addClass('requires-value');
						// set error messages
						if ( good_to_go === true ) {
							good_to_go = 'You must enter a valid email address.';
						} else if ( good_to_go == 'You need to answer all required questions before you can proceed.' ) {
							good_to_go = 'You must enter a valid email address and answer all other required questions before you can proceed.';
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
			$('.event_questions').slideUp(); 
			$('#mer-reg-page-copy-attendee-dv').slideUp();
			$('#mer-reg-page-display-event-questions-lnk').removeClass('hidden');
		} else if ( good_to_go != '' ) {
			msg = new Object();
			msg.error = good_to_go;
			good_to_go = msg;
		}

		return good_to_go;
				
	}



	// show event questions
	$('#mer-reg-page-display-event-questions-lnk').on( 'click', function() {
		$('.event_questions').slideDown();
		$('#mer-reg-page-copy-attendee-dv').slideDown();
		$(this).addClass('hidden');
	});



	/**
	*		show reg page copy attendee error msg
	*/	
	function show_reg_page_copy_attendee_error( event_id, error_msg ) {
		
		$('#mer-error-msg-' + event_id + ' > .msg').html( error_msg );
		$('#mer-ajax-loading').fadeOut('fast');
		$('#mer-error-msg-' + event_id ).show().delay(8000).fadeOut();
	
	}



	$('.reg-page-payment-option-lnk').on( 'click', function() {
	
		var selected_payment_option = $(this);
		var selected_gateway = $(this).attr('id');
		$('#reg-page-select-other-gateway-lnk').attr( 'rel', selected_gateway );
		
		$('#methods-of-payment').slideUp( 250, function() {

			$('.reg-page-payment-option-lnk').each(function() {
				if ( $(this).attr('id') != selected_gateway ) {
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



	// generic click event for displaying and giving focus to an element and hiding control 
	$('.display-the-hidden').on( 'click', function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_display = $(this).attr("rel"); 
		var control = $(this);
		control.addClass('hidden');  
		// display the target's div container - use slideToggle or removeClass
		$('#'+item_to_display+'-dv').slideToggle( 500, function() {
			// hide the control element
			//control.addClass('hidden');  
			// display the target div's hide link
			$('#hide-'+item_to_display).removeClass('hidden'); 
		// if hiding/showing a form input, then id of the form input must = item_to_display
		//$('#'+item_to_display).focus(); // add focus to the target
		}); 
		return false;
	});

	// generic click event for re-hiding an element and displaying it's display control 
	$('.hide-the-displayed').on( 'click', function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_hide = $(this).attr("rel"); 
		var control = $(this);
		control.addClass('hidden');  
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle( 500, function() {
			//$('#'+item_to_hide+'-dv').delay(250).addClass('hidden'); 
			// hide the control element
			//control.addClass('hidden');  
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).removeClass('hidden');  
		}); 
		return false;
	});			

	
	/**
	 * Function : dump()
	 * Arguments: The data - array,hash(associative array),object
	 *    The level - OPTIONAL
	 * Returns  : The textual representation of the array.
	 * This function was inspired by the print_r function of PHP.
	 * This will accept some data as the argument and return a
	 * text that will be a more readable version of the
	 * array/hash/object that is given.
	 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
	 */
	function dump(arr,level) {
		var dumped_text = "";
		if(!level) level = 0;
		
		//The padding given at the beginning of the line.
		var level_padding = "";
		for(var j=0;j<level+1;j++) level_padding += "    ";
		
		if(typeof(arr) == 'object') { //Array/Hashes/Objects 
			for(var item in arr) {
				var value = arr[item];
				
				if(typeof(value) == 'object') { //If it is an array,
					dumped_text += level_padding + "'" + item + "' ...\n";
					dumped_text += dump(value,level+1);
				} else {
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
				}
			}
		} else { //Stings/Chars/Numbers etc.
			dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
		}
		return dumped_text;
	}



})(jQuery);

