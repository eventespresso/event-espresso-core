/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Ticket } from '../../../../../../eventEditor/data/types';
import validFiniteQuantity from '../validFiniteQuantity';

type PercentSoldAtOrAboveProps = {
	percentage: number;
	tickets: Ticket[];
};

/**
 * @param {Object} ticket event ticket object
 * @param {number} percentage
 * @return {boolean} true if sold/qty >= percentage
 */
const percentSoldAtOrAbove = ({ percentage, tickets }: PercentSoldAtOrAboveProps) => {
	const calc = (ticket: Ticket) => {
		const { quantity, sold } = ticket;
		const checkIfSoldAndQtyAreNumbers = is(Number, sold) && is(Number, quantity);

		return checkIfSoldAndQtyAreNumbers && Math.round(sold) / Math.round(quantity) >= percentage / 100;
	};

	const filterFn = (ticket: Ticket) => {
		return validFiniteQuantity(ticket) && calc(ticket);
	};

	return tickets.filter(filterFn);
};

export default percentSoldAtOrAbove;
