/**
 * Internal dependencies
 */
import percentSoldAtOrAbove from './percentSoldAtOrAbove';
import { Ticket } from '../../../../eventEditor/data/types';

const soldOutOnly = (tickets: Ticket[]) => {
	return tickets.filter((ticket) => {
		return ticket.isSoldOut || percentSoldAtOrAbove({ maxQuantity: 100, tickets });
	});
};

export default soldOutOnly;
