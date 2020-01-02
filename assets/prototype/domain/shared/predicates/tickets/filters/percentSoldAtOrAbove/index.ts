/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Ticket } from '../../../../../eventEditor/data/types';
import validFiniteQuantity from '../validFiniteQuantity';

type PercentSoldAtOrAboveProps = {
	maxQuantity: number;
	tickets: Ticket[];
};

/**
 * @param {Object} ticket event ticket object
 * @param {number} maxQuantity
 * @return {boolean} true if sold/qty >= maxQuantity
 */
const percentSoldAtOrAbove = ({ maxQuantity, tickets }: PercentSoldAtOrAboveProps) => {
	const calc = (ticket: Ticket) => {
		const checkIfSoldAndQtyAreNumbers = is(Number, ticket.sold) && is(Number, ticket.quantity);

		return (
			checkIfSoldAndQtyAreNumbers && Math.round(ticket.sold) / Math.round(ticket.quantity) >= maxQuantity / 100
		);
	};

	const filterFn = (ticket: Ticket) => {
		return validFiniteQuantity(ticket) && calc(ticket);
	};

	return tickets.filter(filterFn);
};

export default percentSoldAtOrAbove;
