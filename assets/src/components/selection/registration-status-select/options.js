/**
 * External dependencies
 */
import { reduce } from 'lodash';

export const EE_OPTION_REG_STATUS_SELECT_ALL = 'ALL_REG_STATUSES';

/**
 * Receives an array of registration status entities
 * and returns an array of simple objects
 * that can be passed along to the options array
 * used for the WordPress SelectControl component.
 *
 * @param { Array } regStatuses        An array of registration status entities
 * @param { boolean } addAllOption     If true, will prepend options array
 *                                     with an "ALL" option meaning that all
 *                                     regStatuses are essentially selected
 * @param { string } addAllOptionLabel label displayed for "ALL" option
 * @return { Array }                   Returns an array of simple objects
 *                                     formatted for the WordPress
 *                                     SelectControl component.
 */
export const registrationStatusSelectOptions = (
	regStatuses,
	addAllOption,
	addAllOptionLabel,
) => {
	const regStatusOptions = reduce(
		regStatuses,
		function( options, regStatus ) {
			options.push(
				{
					value: regStatus.STS_ID,
					label: regStatus.STS_code,
				},
			);
			return options;
		},
		[],
	);
	if ( addAllOption === true ) {
		regStatusOptions.unshift( {
			value: EE_OPTION_REG_STATUS_SELECT_ALL,
			label: addAllOptionLabel,
		} );
	}
	return regStatusOptions;
};
