jQuery(document).ready(function($) {

	// add jQuery function to center elements on screen
	$.fn.center = function( position ) {
		position = position !== undefined && position !== '' ? position : 'fixed';
		var element_top = (( $(window).height() / 2 ) - this.outerHeight() ) / 2;
		element_top = position == 'fixed' ? element_top : element_top + $(window).scrollTop();
		element_top = Math.max( 0, element_top );
		var element_left = ( $(window).width() - this.outerWidth() ) / 2;
		element_left = position == 'fixed' ? element_left : element_left + $(window).scrollLeft();
		element_left = Math.max( 0, element_left );
		this.css({ 'position' : position, 'top' : element_top + 'px', 'left' : element_left + 'px' });
		this.css({ 'position' : position, 'top' : element_top + 'px', 'left' : element_left + 'px' });
		return this;
	};

	/**
	*	add jQuery function to return the correct value for a form input regardless of it's type
	*/	
	$.fn.inputValue = function () { 
		var inputType = $(this).prop('type');
		if ( inputType ==  'checkbox' || inputType == 'radio' ) {
			return $(this).prop('checked');
		} else {
			return $(this).val();
		}
	}


	$('.show-if-js').css({ 'display' : 'inline-block' });
	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );

	
	
	function display_espresso_notices() {
		$('#espresso-notices').center();
		$('.espresso-notices').slideDown();
		$('.espresso-notices.fade-away').delay(10000).slideUp();
	}
	display_espresso_notices();



	function display_espresso_ajax_notices( message, type = 'error' ) {
		var notice_id = '#espresso-ajax-notices-' + type;
		$( notice_id + ' .espresso-notices-msg' ).text( message );
		$( '#espresso-ajax-notices' ).center();
		$( notice_id ).slideDown('fast');
		$('.espresso-ajax-notices.fade-away').delay(10000).slideUp('fast');
	}


	//close btn for notifications
	$('.close-espresso-notice').on( 'click', function(e){
		$(this).parent().hide();
		e.preventDefault();
		e.stopPropagation();
	});



	// submit form
	$('.submit-this-form').click(function() {
		e.preventDefault();
		e.stopPropagation();
		$(this).closest('form').submit();
		return false;
	});



	// generic click event for displaying and giving focus to an element and hiding control
	$('.display-the-hidden').on( 'click', function(e) {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_display = $(this).attr("rel");
		//alert( 'item_to_display = ' + item_to_display );
		// hide the control element
		$(this).fadeOut(50).hide();
		// display the target's div container - use slideToggle or removeClass
		$('#'+item_to_display+'-dv').slideToggle(250, function() {
			// display the target div's hide link
			$('#hide-'+item_to_display).show().fadeIn(50);
			// if hiding/showing a form input, then id of the form input must = item_to_display
			$('#'+item_to_display).focus(); // add focus to the target
		});
		e.preventDefault();
		e.stopPropagation();
		return false;
	});



	// generic click event for re-hiding an element and displaying it's display control
	$('.hide-the-displayed').on( 'click', function(e) {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_hide = $(this).attr("rel");
		// hide the control element
		$(this).fadeOut(50).hide();
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle(250, function() {
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).show().fadeIn(50);
		});
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
		
	

	// generic click event for resetting a form input - can be coupled with the "hide_the_displayed" function above
	$('.cancel').click(function() {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_cancel = $(this).attr("rel");
		// set target element's value to an empty string
		$('#'+item_to_cancel).val('');
		e.preventDefault();
		e.stopPropagation();
	});






});



//functions available to window



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


function getFunctionName() {
	var myName = arguments.callee.toString();
	myName = myName.substr('function '.length);
	myName = myName.substr(0, myName.indexOf('('));
	return myName;
}
