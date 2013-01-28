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
		var answer = confirm('Are you absolutely sure you want to delete this '+what+'?\nThis action will delete ALL DATA asscociated with this '+what+'!!!\nThis can NOT be undone!!!');
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



});

