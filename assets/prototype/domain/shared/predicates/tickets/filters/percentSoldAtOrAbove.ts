import validFiniteQuantity from './validFiniteQuantity';

type PercentSoldAtOrAboveProps = {
	maxQuantity: number;
	tickets: any[];
};

/**
 * @param {Object} ticket    event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty >= maxQuantity
 */
const percentSoldAtOrAbove = ({ maxQuantity, tickets }: PercentSoldAtOrAboveProps) => {
	const filterFn = (ticket) => {
		return validFiniteQuantity(ticket) && parseInt(ticket.sold, 10) / parseInt(ticket.qty, 10) >= maxQuantity / 100;
	};

	return tickets.filter(filterFn);
};

export default percentSoldAtOrAbove;
