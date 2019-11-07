/**
 * External imports
 */
import { parseInfinity } from '@eventespresso/utils';

/**
 * A mutation function to update the ticket quantity
 * based on the related datetime capacity change.
 *
 * @param {number} capacity  The datetime capacity.
 */
export const updateTicketQtyAfterCapacityChange = ( capacity ) => ( ticket ) => {
	// Make sure that the non negative ticket qty value is compared with
	// a non negative datetime capacity value in Math.min()
	const nonNegativeDTTCapacity = parseInfinity( capacity, false, false );
	const nonNegativeTKTQty = parseInfinity( ticket.qty, false, false );
	const qty = Math.min( nonNegativeDTTCapacity, nonNegativeTKTQty );
	ticket.qty = parseInfinity( qty, true, true );
};
