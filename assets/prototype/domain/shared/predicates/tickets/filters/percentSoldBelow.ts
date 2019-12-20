import validFiniteQuantity from './validFiniteQuantity';
import validInfiniteQuantity from './validInfiniteQuantity';

type PercentSoldAtOrAboveProps = {
	maxQuantity: number;
	tickets: any[];
};

/**
 * @param {Object} ticket    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty less than than qty
 */
const percentSoldBelow = ({ maxQuantity, tickets }: PercentSoldAtOrAboveProps) => {
	const filterFn = (ticket) => {
		return (
			validInfiniteQuantity(ticket) ||
			(validFiniteQuantity(ticket) && parseInt(ticket.sold, 10) / parseInt(ticket.qty, 10) < maxQuantity / 100)
		);
	};

	return tickets.filter(filterFn);
};

export default percentSoldBelow;
