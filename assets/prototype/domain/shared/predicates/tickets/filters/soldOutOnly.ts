/**
 * Internal dependencies
 */
import percentSoldAtOrAbove from './percentSoldAtOrAbove';

const soldOutOnly = (tickets: any[]) => {
	return tickets.filter((ticket) => {
		return ticket.isSoldOut || percentSoldAtOrAbove({ maxQuantity: 100, tickets });
	});
};

export default soldOutOnly;
