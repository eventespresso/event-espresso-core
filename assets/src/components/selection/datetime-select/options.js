/**
 * External dependencies
 */
import { reduce } from 'lodash';

/**
 * Receives an array of datetime entities and returns an array of simple objects
 * that can be passed along to the options array used for the WordPress
 * SelectControl component.
 *
 * @param { Array } datetimes
 * @return { Array }  Returns an array of simple objects formatted for the
 *                      WordPress SelectControl component.
 */
export const datetimeSelectOptions = ( datetimes ) => {
	return reduce( datetimes, function( options, datetime ) {
		options.push(
			{
				label: datetime.DTT_name,
				value: datetime.DTT_ID,
			},
		);
		return options;
	}, [] );
};
