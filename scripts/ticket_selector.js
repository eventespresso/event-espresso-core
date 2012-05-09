(function($) {

	$('.show-if-js').css({ 'display' : 'inline-block' });
	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );

	// submit form
	$('.event-list-reg-link-btn').click(function() { 
		$(this).closest('form').submit();
		return false;
	});	
	
	// close a div
	$('.close-this-lnk').click(function() {
		$(this).parent().slideUp('fast'); 
	});	

	// add jquery-ui hover fx
	$('.add-hover-fx').hover(
	  function () { $(this).addClass('ui-state-hover'); },
	  function () { $(this).removeClass('ui-state-hover'); }
	);
	
	// add jquery-ui hover fx
	$('.add-hover-fx').click(function() {
		$(this).addClass('ui-state-active');
	});	

	$('.fade-away').delay(8000).fadeOut();

	// generic click event for displaying and giving focus to an element and hiding control 
	$('.display-the-hidden').click(function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_display = $(this).attr("rel"); 
		// hide the control element
		$(this).addClass('hidden');  
		// display the target's div container - use slideToggle or removeClass
		$('#'+item_to_display+'-dv').slideToggle(500, function() {
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
		// hide the control element
		$(this).addClass('hidden');  
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle(500, function() {
			//$('#'+item_to_hide+'-dv').delay(250).addClass('hidden'); 
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).removeClass('hidden');  
		}); 
		return false;
	});

	// generic click event for resetting a form input - can be coupled with the "hide_the_displayed" function above
	$('.cancel').click(function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_cancel = $(this).attr("rel"); 
		// set target element's value to an empty string
		$('#'+item_to_cancel).val(''); 
	});
	
})(jQuery);
