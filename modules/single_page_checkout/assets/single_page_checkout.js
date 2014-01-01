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


	// unset all copy attendee info checkboxes
	$('#spco-copy-all-attendee-chk').prop( 'checked', false );
	$('.spco-copy-attendee-chk').each(function(index) {
		$(this).prop('checked', false);
	});
	// apply coupon button
//	$('#spco-apply-coupon-btn').on( 'click', function() {
//		var error_msg = eei18n.invalid_coupon;
//		if ( eei18n.wp_debug == 1 ) {
//			error_msg = error_msg + ' (' + getFunctionName( arguments.callee.toString() ) + ' )';
//		}
//		show_event_queue_ajax_error_msg( error_msg );
//		return false;
//	});



	// Step 1 - "more options" link in the "Use Attendee #1's information for ALL attendees" box
	$('#display-more-attendee-copy-options').on( 'click', function() {
		$('#spco-copy-all-attendee-chk').prop('checked', false);
	});


	/**
	*	if the Copy All option is checked off, trigger click event on all checkboxes 
	*/
	$('#spco-copy-all-attendee-chk').on( 'click', function() {
		if ( $(this).prop('checked')) {
			$('.spco-copy-attendee-chk').each( function(index) {
				if ( $('#spco-copy-all-attendee-chk').prop('checked') && $(this).prop('checked') != $('#spco-copy-all-attendee-chk').prop('checked') ) {
					$(this).trigger('click');
				}
			}).promise().done( function() {
				if ( ! verify_all_questions_answered( '#spco-registration-attendee_information-frm' )) {
					show_event_queue_ajax_error_msg( good_to_go );
				}			
			});
		}
	});
	

	
	
	// in
	$('.spco-copy-attendee-chk').on( 'click', function() {
		
		if ( $(this).prop('checked')) {
			// array of input fields that require values
			var require_values = [];  
			var multi_inputs_that_do_not_require_values = [];
			// the checkbox that was clicked
			var clicked_checkbox = $(this);
			
			// the primary attendee question group
			var prmry_att_qstn_grp = $('#primary-attendee').val();
//			console.log(' ');
//			console.log( JSON.stringify( 'prmry_att_qstn_grp: ' + prmry_att_qstn_grp, null, 4 ));
			// find all of the primaray attendee's questions for this event
			var prmry_att_questions = $( '#spco-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find(':input');	
	//		$( '#spco-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find('input').css('background','pink');
	//		$( '#spco-attendee-wrap-' + prmry_att_qstn_grp ).children( '.espresso-question-group-wrap' ).find('select').css('background','pink');

			// the targeted attendee question group
			var trgt_att_input = $(this).val();
			console.log( JSON.stringify( 'trgt_att_input: ' + trgt_att_input, null, 4 ));
			
			// set some empty vars (and reset when we loop back)
			var input_id = '';
			var new_input_id = '';
			var input_name = '';
			var input_value = '';
			
			// for each question in the targeted attendee question group
			$( prmry_att_questions ).each(function(index) {
			
				input_id = $(this).attr('id');		
	//			console.log(' ');
	//			console.log( JSON.stringify( 'input_id: ' + input_id, null, 4 ));
				
				if ( input_id != undefined ) {

					// get the input type
					input_type = $(this).prop('type');
					
					// form inputs whose values are obtained using .val()
					var uses_val = [ 'text', 'textarea', 'select-one', 'select-multiple' ];
	//				console.log( JSON.stringify( 'uses_val: ' + dump( uses_val ), null, 4 ));
					// form inputs whose values are obtained using .prop()
					var uses_prop = [ 'checkbox', 'radio' ];
					// is this input a single ?
					if ( $.inArray( input_type, uses_val ) > -1 ) {
	//					console.log( JSON.stringify( input_type + ' uses_val' , null, 4 ));
						// grab it's value
						input_value = $(this).val();
	//					console.log( JSON.stringify( 'input_value: ' + input_value, null, 4 ));
						// is it required ?				
						if ( $(this).hasClass( 'required' ) && input_value == '' ) {
							// find label for this input and grab it's text
							var lbl_txt = $(this).prev('label').html();
	//						console.log( JSON.stringify( 'lbl_txt: ' + lbl_txt, null, 4 ));
							// remove "<em>*</em>" from end
							lbl_txt = lbl_txt.substring(0, lbl_txt.length - 10);
	//						console.log( JSON.stringify( 'lbl_txt: ' + lbl_txt, null, 4 ));
							set_single_input_requires_value_on( $(this) );
							require_values.push( lbl_txt );
						} 
						
					// or a multi ?
					} else if ( $.inArray( input_type, uses_prop ) > -1 ) {
	//					console.log( JSON.stringify( input_type + ' uses_prop' , null, 4 ));
						// grab it's value
						input_value = $(this).prop('checked');
	//					console.log( JSON.stringify( 'input_value: ' + input_value, null, 4 ));
						// find label for this input and grab it's text
						var lbl_txt = $(this).closest('ul').prev('label').html();
	//					console.log( JSON.stringify( 'lbl_txt: ' + lbl_txt, null, 4 ));
						// remove "<em>*</em>" from end
						lbl_txt = lbl_txt.substring(0, lbl_txt.length - 10);
	//					console.log( JSON.stringify( 'lbl_txt: ' + lbl_txt, null, 4 ));						
						if ( $(this).hasClass( 'required' ) && input_value == false ) {						
							// check that this input doesn't already have another option selected
							if ( ! _.contains( multi_inputs_that_do_not_require_values, lbl_txt )) {							
								require_values.push( lbl_txt );
								set_multi_input_requires_value_on( $(this) );
							}						
						} else {
							if ( ! _.contains( multi_inputs_that_do_not_require_values, lbl_txt )) {
								// an option has been selected so this question does not requre a value
								multi_inputs_that_do_not_require_values.push( lbl_txt );							
								// remove from list of inputs that require values
								require_values = _.without( require_values, lbl_txt );							
								set_multi_input_requires_value_off( $(this) );
							}
						}
	//					console.log( JSON.stringify( 'require_values: ' + require_values.join(), null, 4 ));
	//					console.log( JSON.stringify( 'multi_inputs_that_do_not_require_values: ' + multi_inputs_that_do_not_require_values.join(), null, 4 ));
					}	
				}
			});
			//remove duplicates
			multi_inputs_that_do_not_require_values = _.uniq( multi_inputs_that_do_not_require_values );
//			console.log( JSON.stringify( 'require_values: ' + require_values.join(), null, 4 ));
//			console.log( JSON.stringify( 'multi_inputs_that_do_not_require_values: ' + multi_inputs_that_do_not_require_values.join(), null, 4 ));		
			// any empty fields that need values ?
			if ( require_values.length !== 0 ) {
				error_msg = '';
				//remove duplicates
				require_values = _.unique( require_values );
				$( require_values ).each( function( key, field_name ) {
					error_msg = error_msg + field_name + eei18n.required_field  + '<br/>';
				});
				if ( eei18n.wp_debug == 1 ) {
					error_msg = error_msg + '<span class="smaller-text">( spco-copy-attendee-chk )</span>';
				}
				// uncheck the checkbox that was clicked
				$(clicked_checkbox).prop('checked', false);
				// display error_msg				
				show_event_queue_ajax_error_msg( error_msg );
				exit;
			} else {
				// for each question in the targeted attendee question group
				$( prmry_att_questions ).each(function(index) {
					// here we go again...			
					input_id = $(this).attr('id');		
//					console.log(' ');
//					console.log( JSON.stringify( 'input_id: ' + input_id, null, 4 ));
					if ( input_id != undefined ) {
						// split the above var
						var input_id_array =  input_id.split('-');
	//					console.log( JSON.stringify( 'input_id_array: ' + input_id_array, null, 4 ));
			
						// grab the current input's details
						var att_nmbr = input_id_array[0];		 
						var line_item_id = input_id_array[1];		 
						var input_name = input_id_array[2];	
						var answer_id = input_id_array[3];
						input_value = $(this).inputValue();
						
//						if ( eei18n.wp_debug == 1 ) {
//							console.log( JSON.stringify( 'input_name: ' + input_name, null, 4 ));
//						}

						new_input_id = '#' + trgt_att_input + '-' +  input_name;
						if ( answer_id != undefined ) {
							new_input_id = new_input_id + '-' + answer_id;
						}
//						console.log( JSON.stringify( 'new_input_id: ' + new_input_id, null, 4 ));

						if ( $(new_input_id).length > 0 ){
							copy_form_input_value_from_this( $(new_input_id), $(this) )						
						}

						// copy to billing info
						var billing = '#reg-page-billing-' + input_name;
						if ( $(billing).length > 0 ){
							copy_form_input_value_from_this( $(billing), $(this) )						
						}
						
					}
				});
			}		
		}		
	});



	// remove "requires-value" class if field is no longer empty
	$(':input').change(function() { 
		inputType = $(this).prop('type');
		if ( inputType == 'checkbox' || inputType ==  'radio' ) {
			if ( $(this).prop('checked')) {
				set_multi_input_requires_value_off( $(this) );
			}
		} else {
			if ( $.trim( this.value ) != '' ){
				set_single_input_requires_value_off( $(this) );
			}
		}
	});	



	function copy_form_input_value_from_this( target_input, copy_from ) {
		if ( $(target_input).is(':radio') || $(target_input).is(':checkbox') ) {
			$(target_input).prop('checked', $(copy_from).prop('checked'));
//			console.log( JSON.stringify( 'input value copied: ' + $(copy_from).prop('checked'), null, 4 ));
		} else {
			$(target_input).val( $(copy_from).val() );
//			console.log( JSON.stringify( 'input value copied: ' + $(copy_from).val(), null, 4 ));
		}
	}



	function set_requires_value_on( input ) {
		var inputType = $(input).prop('type');
		if ( inputType ==  'checkbox' || inputType == 'radio' ) {
			set_multi_input_requires_value_on( $(input) );
		} else {
			set_single_input_requires_value_on( $(input) );
		}
	}



	function set_requires_value_off( input ) {
		var inputType = $(input).prop('type');
		if ( inputType ==  'checkbox' || inputType == 'radio' ) {
			set_multi_input_requires_value_off( $(input) );
		} else {
			set_single_input_requires_value_off( $(input) );
		}
	}



	function set_multi_input_requires_value_off( input ) {
		$(input).closest('ul').removeClass('requires-value');
		$(input).closest('ul').prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).addClass('hidden');
	}



	function set_multi_input_requires_value_on( input ) {
		$(input).closest('ul').addClass('requires-value');
		$(input).closest('ul').prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).removeClass('hidden');
	}



	function set_single_input_requires_value_off( input ) {
		$(input).removeClass('requires-value');
		$(input).prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).addClass('hidden');
	}



	function set_single_input_requires_value_on( input ) {
		$(input).addClass('requires-value');
		$(input).prevUntil( '.reg-page-form-field-wrap-pg', '.required-text' ).removeClass('hidden');
	}


	
	/**
	*	do_before_event_queue_ajax
	*/	
	function do_before_event_queue_ajax() {
		// stop any message alerts that are in progress	
		$('.espresso-ajax-notices').stop();
		$('#espresso-ajax-long-loading').remove();
		$('#espresso-ajax-loading').center().show();		
	}



	/**
	*	like do_before_event_queue_ajax() but for the finalize_registration step
	*/	
	function processing_registration_notification() {
		$('#spco-go-to-step-finalize_registration-btn').addClass( 'disabled' );
		$('#espresso-ajax-long-loading').remove();
		$('#espresso-ajax-notices').center();	
		$('#espresso-ajax-notices-attention').append( '<span id="espresso-ajax-long-loading" class="ee-spinner ee-spin"></span>' );
		$('#espresso-ajax-notices-attention > .espresso-notices-msg').html( eei18n.process_registration );
		$('#espresso-ajax-notices-attention').removeClass('hidden').show();	
	}



	/**
	*		show event queue ajax success msg
	*/	
	function show_event_queue_ajax_success_msg( success_msg, fadeOut ) {
		
		fadeOut = fadeOut == undefined || fadeOut < 4000 ? 4000 : fadeOut;
		
		if ( success_msg != undefined && success_msg != '' )  {
		
			if ( success_msg.success != undefined ) {
				success_msg = success_msg.success;
			}

			$('#espresso-ajax-notices').center();	
			$('#espresso-ajax-notices-success > .espresso-notices-msg').html( success_msg );
			$('#espresso-ajax-loading').fadeOut('fast');
			$('#espresso-ajax-notices-success').removeClass('hidden').show().delay(fadeOut).fadeOut();
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
		//$('#spco-go-to-step-finalize_registration-btn').prop( 'disabled', false );
		var step = $(this).attr('rel');
		var disabled = $(this).hasClass('disabled');
		if ( step != undefined && step != '' && ! disabled ) {
			next_step = get_next_step( step );			
			if ( eei18n.wp_debug == 1 ) {
				console.log( JSON.stringify( 'single-page-checkout on click > step; ' + step, null, 4 ));
				console.log( JSON.stringify( 'single-page-checkout on click > next_step: ' + next_step, null, 4 ));
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
				if ( eei18n.wp_debug == 1 ) {
					console.log( JSON.stringify( 'single-page-checkout on click > form_to_check ' + form_to_check, null, 4 ));
				}
				if ( form_to_check == false ) {
					show_event_queue_ajax_error_msg( eei18n.no_payment_method );
					return false;
				}
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
		if ( selected_gateway == '' ) {
			return false;
		}
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

			// disable submit btn and processing registration message
			if ( next_step == 'finalize_registration' ) {
				processing_registration_notification();
			}
			
//			console.log( JSON.stringify( 'form_data: ' + form_data, null, 4 ));

			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: form_data,
				dataType: "json",
				beforeSend: function() {
					if ( next_step != 'finalize_registration' ) {
						do_before_event_queue_ajax();
					}
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

//		if ( $('#reg-page-no-payment-required').val() == 1 ) {
//			return true;
//		}

		 if ( whch_form == '' ){
			whch_form = '#spco-registration-' + eei18n.reg_step_1 + '-frm';
		}
		
		console.log( JSON.stringify( 'whch_form: ' + whch_form, null, 4 ));
			
		var good_to_go = true;
		
		$( whch_form + ' .required' ).each( function(index) {

			input_value = $(this).inputValue();

			console.log( JSON.stringify( 'input_id: ' + $(this).attr('id'), null, 4 ));
			console.log( JSON.stringify( 'input value: ' + $(this).val(), null, 4 ));		
			
			// empty field
			if ( input_value == '' || input_value == false ) {
			
				// set error messages
				if ( good_to_go === true ) {
					good_to_go = eei18n.answer_required_questions;
					if ( eei18n.wp_debug == 1 ) {
						good_to_go = good_to_go + '<br/><span class="smaller-text">( verify_all_questions_answered ' + $(this).attr('name') + ' )</span>';
					}
					return false;
				} else if ( good_to_go == eei18n.enter_valid_email ) {
					good_to_go = eei18n.valid_email_and_questions;
					if ( eei18n.wp_debug == 1 ) {
						good_to_go = good_to_go + '<br/><span class="smaller-text">( verify_all_questions_answered ' + $(this).attr('name') + ' )</span>';
					}
					return false;
				} 

				set_requires_value_on( $(this) );

				
			} else {
				
				// is this field an email address ?
				if ( $(this).hasClass('email') ) {
					// send addy for validation
					if ( validate_email_address( $(this).val() )) {
						// good email addy
						set_requires_value_off( $(this) );
					} else {
						// bad email addy
						set_requires_value_on( $(this) );
						// set error messages
						if ( good_to_go === true ) {
							good_to_go = eei18n.enter_valid_email;
							if ( eei18n.wp_debug == 1 ) {
								good_to_go = good_to_go + '<br/><span class="smaller-text">( verify_all_questions_answered ' + $(this).attr('name') + ' )</span>';
							}
							return false;
						}  else if ( good_to_go == eei18n.answer_required_questions ) {
							good_to_go = eei18n.valid_email_and_questions;
							if ( eei18n.wp_debug == 1 ) {
								good_to_go = good_to_go + '<br/><span class="smaller-text">( verify_all_questions_answered ' + $(this).attr('name') + ' )</span>';
							}
							return false;
						} 			
					}								
							
				} else {
					set_requires_value_off( $(this) );
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
