jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {}); 
	

	$('#entries-per-page-btn').hide();
	
	$('#entries-per-page-slct').on( 'change', function() {
		var per_page = $(this).val();
		$('#per_page').val( per_page );
		var theForm = $(this).parents('form');
		var formURL = theForm.attr('action');
		formURL = formURL.replace( '&noheader=true', '' );
		theForm.attr( 'action', formURL );
		theForm.submit();
	}); 	



	$('.confirm-delete').click(function() {
		var what = $(this).attr('rel');
		var answer = confirm( eei18n.confirm_delete );
  		return answer;
	});

	$('.updated.fade').delay(5000).fadeOut();


	// generic click event for displaying and giving focus to an element and hiding control 
	$('.display-the-hidden').click(function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_display = $(this).attr("rel"); 
		var control = $(this);
		// display the target's div container - use slideToggle or removeClass
		$('#'+item_to_display+'-dv').slideToggle(500, function() {
			// hide the control element
			control.addClass('hidden');  
			// display the target div's hide link
			$('#hide-'+item_to_display).removeClass('hidden'); 
			// if hiding/showing a form input, then id of the form input must = item_to_display
			//$('#'+item_to_display).focus(); // add focus to the target
		}); 
		return false;
	});

	// generic click event for re-hiding an element and displaying it's display control 
	$('.hide-the-displayed').click(function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_hide = $(this).attr("rel"); 
		var control = $(this);
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle(500, function() {
			//$('#'+item_to_hide+'-dv').delay(250).addClass('hidden'); 
			// hide the control element
			control.addClass('hidden');  
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).removeClass('hidden');  
		}); 
		return false;
	});	



	$('.add_new_attendee').on( 'click', function( event ) {
  		event.preventDefault();
		
		var goodToGo = validate_form_inputs();
		
		if ( goodToGo === true ) {
			$(this).parents('form').submit();
		} else {
			
			var errorMsg ='<div id="message" class="error fade fade-away"><p>' + goodToGo + '</p></div>';	
			
			$('#att-admin-add-new-attendee-messages-dv').html( errorMsg );
		
			$('body,html').animate({ scrollTop: 100 }, 500 );
			return false;
		}		
		return false;
	});



	function validate_form_inputs() {
		goodToGo = true;
		$('#att-admin-add-new-attendee-frm .required').each( function( index ) {

		    if( $( this ).val() == '' || $( this ).val() == 0 ) {
		 		$( this ).addClass('requires-value').prev( '.validation-notice-dv' ).fadeIn();
				// set error messages
				if ( goodToGo === true ) {
					goodToGo = 'You need to answer all required questions before you can proceed.';
				} else if ( goodToGo == 'You must enter a valid email address.' ) {
					goodToGo = 'You must enter a valid email address and answer all other required questions before you can proceed.';
				} 
					
			}  else {
				
				// is this field an email address ?
				if ( $(this).attr('id') == 'ATT_email' ) {
			
					// grab the addy
					var email_address = $(this).val();
					// send addy for validation
					if ( validate_email_address( email_address )) {
						// good email addy
						$(this).removeClass('requires-value').prev( '.validation-notice-dv' ).fadeOut('fast');
					} else {
						// set error messages
						if ( goodToGo === true ) {
							goodToGo = 'You must enter a valid email address.';
						} else if ( goodToGo == 'You need to answer all required questions before you can proceed.' ) {
							goodToGo = 'You must enter a valid email address and answer all other required questions before you can proceed.';
						} 						
						// bad email addy
						$( this ).addClass('requires-value').prev( '.validation-notice-dv' ).html('You must enter a valid email address.').fadeIn();						

					}
						
				} else {
					$(this).removeClass('requires-value').prev( '.validation-notice-dv' ).fadeOut();		
				}
				
			} 
			
			
			$( this ).on( 'change', function() {
			    if( $( this ).val() != '' || $( this ).val() != 0 ) {
		 		$( this ).removeClass('requires-value').prev( '.validation-notice-dv' ).fadeOut('fast');
				}
			});
			
		});
		
		return goodToGo;
	}



	/**
	*		validate_email_address
	*/
	function validate_email_address (email) {
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}
	
	

});

