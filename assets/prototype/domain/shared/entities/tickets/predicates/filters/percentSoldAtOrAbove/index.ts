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
type FilterFnProps = {
	percentage: number;
	ticket: Ticket;
};

export const filterFn = ({ percentage, ticket }: FilterFnProps): boolean => {
	const calc = (ticket: Ticket): boolean => {
		const { quantity, sold } = ticket;
		const checkIfSoldAndQtyAreNumbers = is(Number, sold) && is(Number, quantity);

		return checkIfSoldAndQtyAreNumbers && Math.round(sold) / Math.round(quantity) >= percentage / 100;
	};

	return validFiniteQuantity(ticket) && calc(ticket);
};

/**
 * @param {Object} ticket event ticket object
 * @param {number} percentage
 * @return {boolean} true if sold/qty >= percentage
 */
const percentSoldAtOrAbove = ({ percentage, tickets }: PercentSoldAtOrAboveProps): Ticket[] => {
	return tickets.filter((ticket) => filterFn({ percentage, ticket }));
};

export default percentSoldAtOrAbove;
