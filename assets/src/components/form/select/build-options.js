/**
 * External dependencies
 */
import { isEmpty, isFunction, isUndefined, reduce, isArray } from 'lodash';
import warning from 'warning';

/**
 * Receives an array of event entities and returns an array of simple objects
 * that can be passed along to the options array used for the WordPress
 * SelectControl component.
 *
 * @param { Array }  entities
 * @param { Object } optionsEntityMap 	Object of key value pairs where values are the
 * 										'label:value' pairings used to populate the Select input
 * @param { string } mapSelection		Determines which optionEntityMap pairing to use
 * @return { Array }  					Returns an array of simple objects formatted for any
 * 										select control that receives its options
 * 										in the format of an array of objects
 *										with label and value keys.
 */
const buildOptions = (
	entities,
	optionsEntityMap,
	mapSelection = 'default'
) => {
	if ( isEmpty( entities ) ) {
		return [];
	}
	if ( isEmpty( optionsEntityMap ) ) {
		warning(
			false,
			'A valid optionsEntityMap must be supplied ' +
			'in order to build options for a ModelSelect component',
			optionsEntityMap
		);
		return [];
	}
	if ( isUndefined( optionsEntityMap[ mapSelection ] ) ) {
		warning(
			false,
			'A valid optionsEntityMap[ mapSelection ] must be supplied ' +
			'in order to build options for a ModelSelect component',
			optionsEntityMap,
			mapSelection
		);
		return [];
	}
	// if requested mapSelection exists then use that
	let map = optionsEntityMap[ mapSelection ];

	// if map is function then simply pass through entities to that function
	if ( isFunction( map ) ) {
		const options = map( entities );
		if ( isArray( options ) ) {
			return options;
		}
		// set map to empty object because the function on it returned something
		// other than an array
		map = {};
		warning(
			false,
			'The optionsEntityMap for ' + mapSelection + 'was a function but' +
			' it did not return an array of options.  Make sure the function' +
			' returns an array of simple objects with label and value keys.'
		);
	}
	return ! isEmpty( map ) ?
		reduce(
			entities,
			function( options, entity ) {
				const label = isFunction( map.label ) ?
					map.label( entity ) :
					entity[ map.label ];
				const value = isFunction( map.value ) ?
					map.value( entity ) :
					entity[ map.value ];
				if ( label && value ) {
					options.push( { label, value } );
				}
				return options;
			},
			[]
		) :
		[];
};

export default buildOptions;
