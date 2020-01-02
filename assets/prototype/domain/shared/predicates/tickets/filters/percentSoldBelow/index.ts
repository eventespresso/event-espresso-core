/**
 * Internal dependencies
 */
import validFiniteQuantity from '../validFiniteQuantity';
import validInfiniteQuantity from '../validInfiniteQuantity';
import { Ticket } from '../../../../../eventEditor/data/types';

type PercentSoldAtOrAboveProps = {
	maxQuantity: number;
	tickets: Ticket[];
};

/**
 * @param {Object} ticket    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty less than than qty
 */
const percentSoldBelow = ({ maxQuantity, tickets }: PercentSoldAtOrAboveProps) => {
	const filterFn = (ticket: Ticket) => {
		return (
			validInfiniteQuantity(ticket) ||
			(validFiniteQuantity(ticket) && Math.round(ticket.sold) / Math.round(ticket.quantity) < maxQuantity / 100)
		);
	};

	return tickets.filter(filterFn);
};

export default percentSoldBelow;
