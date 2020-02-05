/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Ticket } from '../../../../../../eventEditor/data/types';

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and unlimited
 */
const validInfiniteQuantity = (ticket: Ticket): boolean => {
	const { quantity } = ticket;
	const isNumber = is(Number, quantity); // This check has been added because qty is optional in Ticket type.
	const isInfinite = !Number.isFinite(quantity);

	return isNumber && isInfinite;
};

export default validInfiniteQuantity;
