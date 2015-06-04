/*!
 * jQuery serializeFullArray - v0.1 - 28/06/2010
 * http://github.com/jhogendorn/jQuery-serializeFullArray/
 *
 * Copyright (c) 2010 Joshua Hogendorn
 *
 *
 * Whereas .serializeArray() serializes a form into a key:pair array, .serializeFullArray()
 * builds it into a n-tier object, respecting form input arrays.
 *
 */
(function( $ ) {

	'$:nomunge'; // Used by YUI compressor.

	$.fn.serializeFullArray = function() {
		// Grab a set of name:value pairs from the form dom.
		var set = $( this ).serializeArray();
		var output = {};
		// loop through fields
		for ( var field in set ) {
			// but only if they exist
			if ( ! set.hasOwnProperty( field ) ) {
				continue;
			}
			// Split up the field names into array tiers
			var parts = set[ field ].name.split( /\]|\[/ );
			// We need to remove any blank parts returned by the regex.
			parts = $.grep( parts, function( n ) {
				return n != '';
			} );
			// Start ref out at the root of the output object
			var ref = output;
			// loop through segments
			for ( var segment in parts ) {
				// but only if they exist
				if ( ! parts.hasOwnProperty( segment ) ) {
					continue;
				}
				// set key for ease of use.
				var key = parts[ segment ];
				var value = {};
				// If we're at the last part, the value comes from the original array.
				if ( segment == parts.length - 1 ) {
					value = set[ field ].value;
				}
				// Create a throwaway object to merge into output.
				var objNew = {};
				// check if key already exists in ref which means this value should be an array
				if ( ref.hasOwnProperty( key ) && typeof value !== 'object' ) {
					// grab existing value for ref
					var prev_value = ref[ key ];
					// is prev_value already an object ?
					if ( typeof prev_value === 'object' ) {
						// GREAT!!! just add the new value
						objNew[ key ] = prev_value;
						objNew[ key ].push( value );
					} else {
						// no? then make a new sub-object to add values to
						objNew[ key ] = [];
						// add previous and new value
						objNew[ key ].push( prev_value );
						objNew[ key ].push( value );
					}
				} else {
					objNew[ key ] = value;
				}
				// Extend output with our temp object at the depth specified by ref.
				$.extend( true, ref, objNew );
				// Reassign ref to point to this tier, so the next loop can extend it.
				ref = ref[ key ];
			}
		}
		return output;
	};

})( jQuery );
