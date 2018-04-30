/**
 * External dependencies
 */
import { reduce } from 'lodash';

/**
 * Receives an array of event entities and returns an array of simple objects
 * that can be passed along to the options array used for the WordPress
 * SelectControl component.
 *
 * @param { Array } events
 * @return { Array }
 */
export const buildEventOptions = ( events ) => {
	return reduce( events, function( options, event ) {
		options.push(
			{
				label: event.EVT_name,
				value: event.EVT_ID,
			},
		);
		return options;
	}, [] );
};
