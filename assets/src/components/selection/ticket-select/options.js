/**
 * External dependencies
 */
import { reduce } from 'lodash';

export const EE_OPTION_TICKET_SELECT_ALL = 'ALL_TICKETS';

/**
 * Receives an array of ticket entities and returns an array of simple objects
 * that can be passed along to the options array used for the WordPress
 * SelectControl component.
 *
 * @param { Array } tickets            An array of ticket entities
 * @param { boolean } addAllOption     If true, will prepend options array
 *                                     with an "ALL" option meaning that all
 *                                     tickets are essentially selected
 * @param { string } addAllOptionLabel label displayed for "ALL" option
 * @return { Array }                   Returns an array of simple objects
 *                                     formatted for the WordPress
 *                                     SelectControl component.
 */
export const ticketSelectOptions = (
	tickets,
	addAllOption,
	addAllOptionLabel,
) => {
	const ticketOptions = reduce(
		tickets,
		function( options, ticket ) {
			options.push(
				{
					label: ticket.TKT_name,
					value: ticket.TKT_ID,
				},
			);
			return options;
		},
		[]
	);
	if ( addAllOption === true ) {
		ticketOptions.unshift( {
			value: EE_OPTION_TICKET_SELECT_ALL,
			label: addAllOptionLabel,
		} );
	}
	return ticketOptions;
};
