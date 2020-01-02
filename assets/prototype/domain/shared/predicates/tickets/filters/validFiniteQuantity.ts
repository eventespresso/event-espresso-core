/**
 * Internal dependencies
 */
import { Ticket } from '../../../../eventEditor/data/types';

/**
 * @param {Object} ticket    event ticket object
 * @return {boolean} true if qty property is valid and NOT infinite
 */
const validFiniteQuantity = (ticket: Ticket): boolean => {
	return ticket.quantity !== Infinity && Math.round(ticket.quantity) > 0;
};

export default validFiniteQuantity;
