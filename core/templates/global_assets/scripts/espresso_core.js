jQuery( document ).ready( function ( $ ) {

		/**
	*	add jQuery functions
	*/
	$.fn.extend({

		/**
		*	center elements on screen
		 * @param {string}  position // relative, absolute or fixed (default)
		*/
		eeCenter : function( position ) {
			position = typeof position !== 'undefined' && position !== '' ? position : 'fixed';
			var element_top = (( $( window ).height() / 2 ) - this.outerHeight() ) / 2;
			element_top = position === 'fixed' ? element_top + $( window ).height() / 8 : element_top + $( window ).scrollTop;
			element_top = Math.max( 0, element_top );
			var element_left = ( $( window ).width() - this.outerWidth() ) / 2;
			element_left = position === 'fixed' ? element_left : element_left + $( window ).scrollLeft;
			element_left = Math.max( 0, element_left );
			this.css({ 'position' : position, 'top' : element_top + 'px', 'left' : element_left + 'px' , 'margin' : 0 });
			return this;
		},


		/**
		 * Shortcut for adding a window overlay quickly if none exists in the dom
		 *
		 * @param {int} opacity allows the setting of the opacity value for the overlay via client. opacity[0] = webkit opacity, opacity[1] = value for alpha(opacity=).
		 * @return {object}
		 */
		eeAddOverlay : function( opacity ) {
			opacity = typeof opacity === 'undefined' || opacity > 1 ? 0.5 : opacity;
			var overlay = '<div id="ee-overlay"></div>';
			$(overlay).appendTo('body').css({
				'position' : 'fixed',
				'top' : 0,
				'left' : 0,
				'width' : '100%',
				'height' : '100%',
				'background' : '#000',
				'opacity' : opacity,
				'filter' : 'alpha(opacity=' + ( opacity * 100 ) + ')',
				'z-index' : 10000
			});
			return this;
		},




		/**
		 * Shortcut for removing a window overlay quickly if none exists in the dom (will destroy)
		 * @return {object}
		 */
		eeRemoveOverlay : function() {
			$('#ee-overlay').remove();
			return this;
		},


		/**
		 * adds a scrollTo action for jQuery
		 * @return {object}
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
			if ( inputType ===  'checkbox' || inputType === 'radio' ) {
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
			urlParams.hash = typeof url[1] !== 'undefined' && url[1] !== '' ? url[1] : '';
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
				return i !== ind;
			});
		}


	});


	var existing_message = $('#message');
	$('.show-if-js').css({ 'display' : 'inline-block' });
	$('.hide-if-no-js').removeClass( 'hide-if-no-js' );


	window.do_before_admin_page_ajax = function do_before_admin_page_ajax() {
		// stop any message alerts that are in progress
		$(existing_message).stop().hide();
		// spinny things pacify the masses
		$('#espresso-ajax-loading').eeCenter().show();
	};



	window.show_admin_page_ajax_msg = function show_admin_page_ajax_msg( response, beforeWhat, removeExisting ) {
		removeExisting = typeof removeExisting !== false;
		var messages = $( '#ajax-notices-container' );
		// if there is no existing message...
		if ( removeExisting === true ) {
			messages.html('');
		}
		// make sure there is at least ONE notification to display
		if (
			( typeof response !== 'object' ) ||
			! ( // or NOT the following
				( typeof response.success !== 'undefined' && response.success !== '' && response.success !== false ) ||
				( typeof response.attention !== 'undefined' && response.attention !== '' && response.attention !== false ) ||
				( typeof response.errors !== 'undefined' && response.errors !== '' && response.errors !== false )
			)
		) {
			console.log( JSON.stringify( 'show_admin_page_ajax_msg response: ', null, 4 ) );
			console.log( response );
			return;
		}

		$( '#espresso-ajax-loading' ).fadeOut( 'fast' );
		var msg = '';
		// no existing errors?
		if ( typeof(response.errors) !== 'undefined' && response.errors !== '' && response.errors !== false ) {
			msg = msg + '<div class="ee-admin-notification error hidden"><p>' + response.errors + '</p></div>';
		}
		// attention notice?
		if ( typeof(response.attention) !== 'undefined' && response.attention !== '' && response.attention !== false ) {
			msg = msg + '<div class="ee-admin-notification ee-attention hidden"><p>' + response.attention + '</p></div>';
		}
		// success ?
		if ( typeof(response.success) !== 'undefined' && response.success !== '' && response.success !== false ) {
			msg = msg + '<div class="ee-admin-notification updated hidden ee-fade-away"><p>' + response.success + '</p></div>';
		}
		messages.html( msg );
		var new_messages = messages;
		messages.remove();
		beforeWhat = typeof beforeWhat !== 'undefined' && beforeWhat !== '' ? beforeWhat : '.nav-tab-wrapper';
		// set message content
		var messages_displayed = false;
		$( 'body, html' ).animate( { scrollTop : 0 }, 'normal', function() {
			if ( ! messages_displayed ) {
				$( beforeWhat ).before( new_messages );
			}
		} );
		// and display it
		new_messages.find('.ee-admin-notification').each( function() {
			$( this ).removeAttr( 'style' ).removeClass( 'hidden' ).show();
			//  but sometimes not too long
			if ( $( this ).hasClass( 'ee-fade-away' ) ) {
				$( this ).delay( 8000 ).fadeOut();
			}
		} );

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



	/**
	 * when a Country select dropdown changes, find its corresponding state select dropdown
	 * and hide all option groups that do not correspond to the selected country
	 */
	$( '.ee-country-select-js' ).change(
		function () {
			var country_select_id = $(this).attr( 'id' ),
				selected_country  = $(this).find( "option:selected" ).text(),
				state_select_id   = '',
				$state_select      = null,
				selected_state    = null,
				valid_option      = false;

			// console.log( ' ' );
			// console.log( 'COUNTRY SELECTION CHANGED' );
			// console.log( 'country_select_id: ' + country_select_id );
			// console.log( 'selected_country: ' + selected_country );
			// console.log( 'state_select_id: ' + state_select_id );
			// console.log( 'country_select_id.indexOf( country ): ' + ~country_select_id.indexOf( 'country' ) );

			// is this country question a system question ?
			if ( ~country_select_id.indexOf( 'country' ) ) {
				// good, then just swap 'country' for 'state' to get the corresponding state select id
				state_select_id = country_select_id.replace( 'country', 'state' );
			} else {
				// no ??? dang... now we have to try and find the corresponding state question.
				var $state_div = $(this).parent().next('.ee-state-select-js-input-dv');
				if ( ! $state_div.length ) {
					// console.log( 'State Select div not found after Country Select div' );
					$state_div = $(this).parent().prev( '.ee-state-select-js-input-dv' );
				}
				if ( ! $state_div.length ) {
					console.log(
						'Can not find corresponding State select for Country select with id: '
						+ country_select_id + '. Ideally the State question should be immediately after the Country question.'
					);
				}
				$state_select = $state_div.find('.ee-state-select-js');
				if ( $state_select === null || ! $state_select.length ) {
						console.log(
							'Invalid "country_select_id"! Can not find corresponding State select for Country select with id: '
							+ country_select_id
						);
						return;
				}
				state_select_id = $state_select.attr( 'id' );
			}
			if ( ( $state_select === null || ! $state_select.length ) && state_select_id !== '' ) {
				$state_select = $( '#' + state_select_id );
			}
            // console.log('state_select_id: ' + state_select_id, false);

            if ( $state_select.length ) {
                // console.log('FOUND STATE SELECTOR');
                // grab the currently selected state (if there is one)
				selected_state = $state_select.find( ":selected" ).text();
				// console.log( 'selected_state: ' + selected_state );
				// display and enable all optgroups
				$( 'optgroup', $state_select )
                    .show()
                    .children('option')
                    .prop('disabled', false)
                    .show();
				// if a valid country is selected
				if ( selected_country !== '' ) {
                    // console.log('Hide unselected countries');
                    // hide all unselected optgroups and disable their options
                    $( 'optgroup:not([label="' + selected_country + '"])', $state_select )
                        .hide()
                        .children('option')
                        .prop('selected', false)
                        .prop('disabled', true);
                    // then enable all options for selected country, but don't select anything
                    $('optgroup[label="' + selected_country + '"]', $state_select)
                        .show()
                        .children('option')
                        .prop('disabled', false);
                    // if a valid corresponding state select exists
					if ( selected_state.length ) {
						// loop through all of its optgroups
						$state_select.find( 'optgroup' ).each(
							function () {
                                // if this is the selected optgroup
								if ( $(this).attr('label') === selected_country ) {
								    // then make sure its options are enabled
                                    $(this).show().children('option').prop('disabled', false);
								    // and it contains the selected option
                                    if ( $(this).text().indexOf(selected_state) !== -1 ) {
                                        // then loop through each of its options
                                        $(this).find('option').each(
                                            function () {
                                                // console.log('option text: ' + $(this).text() );
                                                // was this option match the previously selected state ?
                                                if ($(this).text() === selected_state) {
                                                    valid_option = true;
                                                    // make sure it's set as the selected option
                                                    $(this).prop('selected', true);
                                                    $state_select.change();
                                                } else {
                                                    $(this).prop('selected', false);
                                                }
                                            }
                                        );
                                    }
								}
							}
						);
					}
					// console.log( 'valid_option: ' + valid_option );
					// if the previously selected state is not valid
					if ( valid_option ) {
                        // console.log('VALID OPTION');
                        // previously selected state IS valid
                        // so make sure the empty placeholder is unselected
                        $state_select
                            .find('optgroup[label=""]')
                            .hide()
                            .find('option[value=""]')
                            .prop('selected', false)
                            .prop('disabled', true);

					} else {
                        // console.log('INVALID OPTION');
                        // then find the empty placeholder and select it
                        $state_select
                            .find('optgroup[label=""]')
                            .show()
                            .find('option[value=""]')
                            .prop('disabled', false)
                            .prop('selected', true)
                            .val('');

                    }
				} else {
					// console.log( 'NO COUNTRY SELECTED' );
					// display any hidden optgroups and re-enable options
					$state_select.find( 'optgroup' ).each(
						function () {
							// console.log( 'optgroup: ' + $(this).val() );
							$(this).show().children('option').prop('disabled', false);
						}
					);
				}
			}
        }
	);




    /**
     * @function rgb2hex
     * converts hex format to a rgb color
     * @see http://jsfiddle.net/Mottie/xcqpF/1/light/
     *
     * @param {string} rgb
     * @return string
     */
    window.eeRgbToHex = function (rgb) {
        // console_log('rgb', rgb, false);
        var hex = '';
        var rgb_parts = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        if (rgb_parts && rgb_parts.length === 4) {
            hex = "#" + ("0" + parseInt(rgb_parts[1], 10).toString(16)).slice(-2);
            hex += ("0" + parseInt(rgb_parts[2], 10).toString(16)).slice(-2);
            hex += ("0" + parseInt(rgb_parts[3], 10).toString(16)).slice(-2);
        }
        hex = hex !== '' ? hex : rgb;
        // console_log('hex', hex, false);
        return hex;
    };



    /**
     * @function getParentBackgroundColor
     * recursively walks up the DOM looking for the first element with
     * some sort of color set for the background, then returns that value
     *
     * @param {object} domElement
     * @return string
     */
    window.eeGetParentBackgroundColor = function (domElement) {
    	// set default color of white with full opacity
        var BackgroundColor = 'rgba(255,255,255,1)';
        var $parent = domElement.parent();
        // if no BG color is found by the time we get to the "<html>" tag, then just return the default;
        if ($parent.length && $parent.prop('tagName') !== 'HTML') {
            // console_log('$parent', $parent.prop('tagName') + ' #' + $parent.attr('id'), true);
            BackgroundColor = $parent.css('backgroundColor');
            // console_log('BackgroundColor', BackgroundColor, false);
            if (
                typeof BackgroundColor === 'undefined'
                || BackgroundColor === 'transparent'
                || BackgroundColor === 'inherit'
                || BackgroundColor === 'rgba(0, 0, 0, 0)'
                || BackgroundColor === ''
            ) {
                return eeGetParentBackgroundColor($parent);
            }
        }
        return BackgroundColor;
    };



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
	if ( ! level ) {
		level = 0;
	}

	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) {
		level_padding += "    ";
	}
	//Array/Hashes/Objects
	if( typeof(arr) === 'object' ) {
		for(var item in arr) {
			if ( typeof item !== 'undefined' && arr.hasOwnProperty( item ) ) {
				var value = arr[item];
				//If it is an array
				if( typeof(value) === 'object' ) {
					dumped_text += level_padding + "'" + item + "' ...\n";
					dumped_text += dump(value,level+1);
				} else {
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
				}
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

/**
 *  @function console_log
 *  print to the browser console
 * @param  {string} item_name
 * @param  {*} value
 * @param  {boolean} spacer
 */
function console_log( item_name, value, spacer ) {
	if ( typeof value === 'object' ) {
		console_log_object( item_name, value, 0 );
	} else {
		if ( spacer === true ) {
			console.log( ' ' );
		}
		if ( typeof item_name !== 'undefined' && typeof value !== 'undefined' && value !== '' ) {
			console.log( item_name + ' = ' + value );
		} else if ( typeof item_name !== 'undefined' ) {
			console.log( item_name );
		}
	}
}

/**
 * @function console_log_object
 * print object to the browser console
 * @param  {string} obj_name
 * @param  {object} obj
 * @param  {number} depth
 */
function console_log_object( obj_name, obj, depth ) {
	depth      = typeof depth !== 'undefined' ? depth : 0;
	var spacer = '';
	for ( var i = 0; i < depth; i++ ) {
		spacer = spacer + '    ';
	}
	if ( typeof obj === 'object' ) {
		if ( !depth ) {
			console.log( ' ' );
		}
		if ( typeof obj_name !== 'undefined' ) {
			console.log( spacer + 'OBJ: ' + obj_name + ' : ' );
		} else {
			console.log( spacer + 'OBJ : ' );
		}
		jQuery.each(
			obj, function ( index, value ) {
				if ( typeof value === 'object' && depth < 3 ) {
					depth++;
					console_log_object( index, value, depth );
				} else {
					console.log( spacer + index + ' = ' + value );
				}
				depth = 0;
			}
		);
	} else {
		console_log( spacer + obj_name, obj, true );
	}
}


/**
 * @function object_exists
 * returns true if object exists and displays console error if it does not
 * @param  {object} $object
 * @param  {string} object_name
 * @return boolean
 */
function object_exists($object, object_name) {
    if ($object.length) {
        return true;
    }
    console_log('ERROR: object not found', object_name, false);
    return false;
}
