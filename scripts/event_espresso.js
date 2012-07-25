jQuery(document).ready(function($) {


	function validate_form_inputs( submittedForm ) {
	
		var goodToGo = true;
		var cntr = 1;
		
		$( submittedForm ).find('.required').each( function( index ) {
		    if( $(this).val() == '' || $(this).val() == 0 ) {
		 		$(this).addClass('requires-value').siblings( '.validation-notice-dv' ).fadeIn();
				goodToGo = false;
			}
			$(this).on( 'change', function() {
			    if( $(this).val() != '' || $(this).val() != 0 ) {
			 		$(this).removeClass('requires-value').siblings( '.validation-notice-dv' ).fadeOut('fast');
				}
			});
			if ( cntr == 1 ) {
				var thisPos = $(this).offset();				
				$(window).scrollTop( thisPos.top - 200 );
			}
			cntr++;
		});
		return goodToGo;
	}

	
	$('.submit-for-validation').click(function(event) {
		event.preventDefault();
		var submittedForm = $(this).closest('form');
		if ( validate_form_inputs( submittedForm ) ) {
			submittedForm.submit();
		} 	
	});




	// generic click event for displaying and giving focus to an element and hiding control 
	$('.display-the-hidden').click(function() {
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
	$('.hide-the-displayed').click(function() {
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
	



	
	$('#admin-recaptcha-settings-slct').change( function() {
		if ( $(this).val() == 1 ) {
			$('.admin-recaptcha-settings-tr').find('.maybe-required').removeClass('maybe-required').addClass('required');
			$('.admin-recaptcha-settings-tr').show();
		} else {
			$('.admin-recaptcha-settings-tr').find('.required').removeClass('required').addClass('maybe-required');
			$('.admin-recaptcha-settings-tr').hide();
		}
	});
				
	$('#admin-recaptcha-settings-slct').trigger( 'change' );




});

	
function escape_square_brackets( value ) {
	value = value.replace(/[[]/g,'\\\[');
	value = value.replace(/]/g,'\\\]'); 
	return value; 
}


//Confirm Delete
function confirmDelete(){
	if (confirm('Are you sure want to delete?')){
		return true;
	}
	return false;
}

	  
//Select All
function selectAll(x) {
	for(var i=0,l=x.form.length; i<l; i++) {
		if(x.form[i].type == 'checkbox' && x.form[i].name != 'sAll') {
			x.form[i].checked=x.form[i].checked?false:true
		}			
	}
}
