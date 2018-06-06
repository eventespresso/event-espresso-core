/**
 * External dependencies
 */
import { reduce } from 'lodash';
import { __ } from '@eventespresso/i18n';

export const EE_OPTION_DATETIME_SELECT_ALL = 'ALL_DATETIMES';

/**
 * Receives an array of datetime entities and returns an array of simple objects
 * that can be passed along to the options array used for the WordPress
 * SelectControl component.
 *
 * @param { Array } datetimes          	An array of datetime entities
 * @param { boolean } addAllOption     	If true, will prepend options array
 *                                     	with an "ALL" option meaning that all
 *                                     	datetimes are essentially selected
 * @param { string } addAllOptionLabel 	label displayed for "ALL" option
 * @return { Array }   				   	Returns an array of simple objects
 * 										formatted for the WordPress
 * 										SelectControl component.
 */
export const datetimeSelectOptions = (
	datetimes,
	addAllOption,
	addAllOptionLabel,
) => {
	const datetimeOptions = reduce( datetimes, function( options, datetime ) {
		options.push(
			{
				label: datetime.DTT_name,
				value: datetime.DTT_ID,
			},
		);
		return options;
	}, [] );
	if ( addAllOption === true ) {
		datetimeOptions.unshift( {
			value: EE_OPTION_DATETIME_SELECT_ALL,
			label: addAllOptionLabel,
		} );
	}
	return datetimeOptions;
};
