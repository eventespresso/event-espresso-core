/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Ticket } from '../../../../eventEditor/data/types';

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = (ticket: Ticket) => {
	const isNumber = is(Number, ticket.quantity); // This check has been added because qty is optional in Ticket type.
	return isNumber && ticket.quantity === Infinity;
};

export default validInfiniteQuantity;
