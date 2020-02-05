import allOnSaleAndPending from './allOnSaleAndPending';
import trashedOnly from './trashedOnly';
import expiredOnly from './expiredOnly';
import nextOnSaleOrPendingOnly from './nextOnSaleOrPendingOnly';
import onSaleOnly from './onSaleOnly';
import pendingOnly from './pendingOnly';
import percentSoldAtOrAbove from './percentSoldAtOrAbove';
import percentSoldBelow from './percentSoldBelow';
import soldOutOnly from './soldOutOnly';

import { ShowTickets } from '../../../../../eventEditor/interfaces/ticket/types';
import { Ticket } from '../../../../../eventEditor/services/apollo/types';

export const now = new Date();

interface FilterTickets {
	tickets: Ticket[];
	show?: ShowTickets;
}

/**
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const filters = ({ tickets, show = ShowTickets.nextOnSaleOrPendingOnly }: FilterTickets): Ticket[] => {
	switch (show) {
		case ShowTickets.above50Sold:
			return percentSoldAtOrAbove({ percentage: 50, tickets });
		case ShowTickets.above75Sold:
			return percentSoldAtOrAbove({ percentage: 75, tickets });
		case ShowTickets.above90Sold:
			return percentSoldAtOrAbove({ percentage: 90, tickets });
		case ShowTickets.all:
			return tickets;
		case ShowTickets.trashedOnly:
			return trashedOnly(tickets);
		case ShowTickets.below50Sold:
			return percentSoldBelow({ percentage: 50, tickets });
		case ShowTickets.expiredOnly:
			return expiredOnly(tickets);
		case ShowTickets.nextOnSaleOrPendingOnly:
			return nextOnSaleOrPendingOnly(tickets);
		case ShowTickets.onSaleAndPending:
			return allOnSaleAndPending(tickets);
		case ShowTickets.onSaleOnly:
			return onSaleOnly(tickets);
		case ShowTickets.pendingOnly:
			return pendingOnly(tickets);
		case ShowTickets.soldOutOnly:
			return soldOutOnly(tickets);
		default:
			return tickets;
	}
};

export default filters;
