(function ( $ ) {

	/**
	*	add jQuery functions
	*/
	$.fn.extend({

		/**
		*	center elements on screen
		 * @param string  position : relative, absolute or fixed (default)
		*/
		eeCenter : function( position ) {
			position = typeof position !== 'undefined' && position !== '' ? position : 'fixed';
			var element_top = (( $( window ).height() / 2 ) - this.outerHeight() ) / 2;
			element_top = position == 'fixed' ? element_top + $( window ).height() / 8 : element_top + $( window ).scrollTop();
			element_top = Math.max( 0, element_top );
			var element_left = ( $( window ).width() - this.outerWidth() ) / 2;
			element_left = position == 'fixed' ? element_left : element_left + $( window ).scrollLeft();
			element_left = Math.max( 0, element_left );
			this.css({ 'position' : position, 'top' : element_top + 'px', 'left' : element_left + 'px' , 'margin' : 0 });
			return this;
		},


		/**
		 * Shortcut for adding a window overlay quickly if none exists in the dom
		 *
		 * @param {array} opacity allows the setting of the opacity value for the overlay via client. opacity[0] = webkit opacity, opacity[1] = value for alpha(opacity=).
		 * @return {jQuery}
		 */
		eeAddOverlay : function( opacity ) {
			opacity = typeof(opacity) === 'undefined' ? [0.5, 50] : opacity;
			var overlay = '<div id="ee-overlay"></div>';
			$(overlay).appendTo('body').css({
				'position' : 'fixed',
				'top' : 0,
				'left' : 0,
				'width' : '100%',
				'height' : '100%',
				'background' : '#000',
				'opacity' : opacity[0],
				'filter' : 'alpha(opacity=' + opacity[1] + ')',
				'z-index' : 10000
			});
			return this;
		},




		/**
		 * Shortcut for removing a window overlay quickly if none exists in the dom (will destroy)
		 * @return {jQuery}
		 */
		eeRemoveOverlay : function() {
			$('#ee-overlay').remove();
			return this;
		},


		/**
		 * adds a scrollTo action for jQuery
		 * @return {jQuery}
		 */
		eeScrollTo : function( speed ) {
			var selector = this;
			speed = typeof(speed) === 'undefined' ? 2000 : speed;
			$("html,body").animate({
				scrollTop: selector.offset().top - 80
			}, speed);
			return this;
		},


		/**
		*	return the correct value for a form input regardless of it's type
		*/
		eeInputValue : function () {
			var inputType = this.prop('type');
			if ( inputType ==  'checkbox' || inputType == 'radio' ) {
				return this.prop('checked');
			} else {
				return this.val();
			}
		},


		/**
		*	return an object of URL params
		*/
		eeGetParams : function () {
			var urlParams = {};
			var url = this.attr('href');
			url = typeof url !== 'undefined' && url !== '' ? url : location.href;
			url = url.substring( url.indexOf( '?' ) + 1 ).split( '#' );
			urlParams['hash'] = typeof url[1] !== 'undefined' && url[1] !== '' ? url[1] : '';
			var qs = url[0].split( '&' );
			for( var i = 0; i < qs.length; i++ ) {
				qs[ i ] = qs[ i ].split( '=' );
				urlParams[ qs[ i ][0] ] = decodeURIComponent( qs[ i ][1] );
			}
			return urlParams;
		},


		/**
		 * Set element visibility to hidden
		 *
		 */
		eeInvisible: function() {
			return this.each( function() {
				$(this).css("visibility", "hidden");
			});
		},


		/**
		 * Set element visibility to visible
		 *
		 */
		eeVisible: function() {
			return this.each( function() {
				$(this).css("visibility", "visible");
			});
		},



		/**
		 * This helper method simply removes any matching items from a js array.
		 * @param  {array} arr js array to remove items from
		 * @param  {string}   ind value of what element is being removed
		 * @return {array}    new array with removed items
		 */
		removeFromArray: function( arr, ind ) {
			return arr.filter( function(i) {
				return i != ind;
			});
		},


	});

}( jQuery ));


jQuery(document).ready(function($) {

	$('.show-if-js').css({ 'display' : 'inline-block' });
	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );


	window.do_before_admin_page_ajax = function do_before_admin_page_ajax() {
		// stop any message alerts that are in progress
		$('#message').stop().hide();
		// spinny things pacify the masses
		$('#espresso-ajax-loading').eeCenter().show();
	};



	window.show_admin_page_ajax_msg = function show_admin_page_ajax_msg( response, beforeWhat, closeModal ) {
		console.log( response );
		$('#espresso-ajax-loading').fadeOut('fast');
		if (( typeof(response.success) !== 'undefined' && response.success !== '' ) || ( typeof(response.errors) !== 'undefined' && response.errors !== '' )) {
			if ( closeModal === undefined ) {
				closeModal = false;
			}
			// if there is no existing message...
			if ( $('#message').length === 0 ) {
				//create one and add it to the DOM
				$('.nav-tab-wrapper').before( '<div id="message" class="updated hidden"></div>' );
			}
			var existing_message = $('#message');
			var fadeaway = true;
			// success ?
			if ( typeof(response.success) !== 'undefined' && response.success !== '' && response.success !== false ) {
				msg = '<p>' + response.success + '</p>';
			}
			// no existing errors?
			if ( typeof(response.errors) !== 'undefined' && response.errors !== '' && response.errors !== false ) {
				msg = '<p>' + response.errors + '</p>';
				$(existing_message).removeClass('updated').addClass('error');
				fadeaway = false;
			}
			// set message content
			$(existing_message).html(msg);
			//  change location in the DOM if so desired
			if ( typeof(beforeWhat) !== 'undefined' && beforeWhat !== '' ) {
				var moved_message = $(existing_message);
				$(existing_message).remove();
				$( beforeWhat ).before( moved_message );
			}
			// and display it
			if ( fadeaway === true ) {
				$('#message').removeAttr('style').removeClass('hidden').show().delay(8000).fadeOut();
			} else {
				$('#message').removeAttr('style').removeClass('hidden').show();
			}
		}
	};


	function display_espresso_notices() {
		$('#espresso-notices').eeCenter();
		$('.espresso-notices').slideDown();
		$('.espresso-notices.fade-away').delay(10000).slideUp();
	}
	display_espresso_notices();



	function display_espresso_ajax_notices( message, type ) {
		type = typeof type !== 'undefined' && type !== '' ? type : 'error';
		var notice_id = '#espresso-ajax-notices-' + type;
		$( notice_id + ' .espresso-notices-msg' ).text( message );
		$( '#espresso-ajax-notices' ).eeCenter();
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
	$('.submit-this-form').click(function(e) {
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
