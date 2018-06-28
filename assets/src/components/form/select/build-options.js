/**
 * External dependencies
 */
import { isEmpty, isFunction, isUndefined, reduce } from 'lodash';

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
	if ( isEmpty( entities ) || isEmpty( optionsEntityMap ) ) {
		return [];
	}
	// if requested mapSelection exists then use that
	let map = ! isUndefined( optionsEntityMap[ mapSelection ] ) ?
		optionsEntityMap[ mapSelection ] :
		null;
	// if not but default exists then use that
	map = map === null && ! isUndefined( optionsEntityMap.default ) ?
		optionsEntityMap.default :
		null;
	// if default doesn't exist then just grab first option
	map = map === null ?
		optionsEntityMap[ Object.keys( optionsEntityMap )[ 0 ] ] :
		map;
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
