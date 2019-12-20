/**
 * Internal dependencies
 */
import percentSoldAtOrAbove from './percentSoldAtOrAbove';

const soldOutOnly = (tickets: any[]) => {
	return tickets.filter((ticket) => {
		return ticket.isSoldOut || percentSoldAtOrAbove(ticket, 100);
	});
};

export default soldOutOnly;
