import { parseISO, formatISO } from 'date-fns';

import { Ticket } from '@edtrServices/apollo';
import { TicketsToShow } from '@edtrServices/filterState';
import allOnSaleAndPending from './allOnSaleAndPending';
import trashedOnly from './trashedOnly';
import expiredOnly from './expiredOnly';
import nextOnSaleOrPendingOnly from './nextOnSaleOrPendingOnly';
import onSaleOnly from './onSaleOnly';
import pendingOnly from './pendingOnly';
import percentSoldAtOrAbove from './percentSoldAtOrAbove';
import percentSoldBelow from './percentSoldBelow';
import soldOutOnly from './soldOutOnly';

export const now = parseISO(formatISO(new Date()));

interface FilterTickets {
	tickets: Ticket[];
	show?: TicketsToShow;
}

/**
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const filters = ({ tickets, show = TicketsToShow.nextOnSaleOrPendingOnly }: FilterTickets): Ticket[] => {
	switch (show) {
		case TicketsToShow.above50Sold:
			return percentSoldAtOrAbove({ percentage: 50, tickets });
		case TicketsToShow.above75Sold:
			return percentSoldAtOrAbove({ percentage: 75, tickets });
		case TicketsToShow.above90Sold:
			return percentSoldAtOrAbove({ percentage: 90, tickets });
		case TicketsToShow.all:
			return tickets;
		case TicketsToShow.trashedOnly:
			return trashedOnly(tickets);
		case TicketsToShow.below50Sold:
			return percentSoldBelow({ percentage: 50, tickets });
		case TicketsToShow.expiredOnly:
			return expiredOnly(tickets);
		case TicketsToShow.nextOnSaleOrPendingOnly:
			return nextOnSaleOrPendingOnly(tickets);
		case TicketsToShow.onSaleAndPending:
			return allOnSaleAndPending(tickets);
		case TicketsToShow.onSaleOnly:
			return onSaleOnly(tickets);
		case TicketsToShow.pendingOnly:
			return pendingOnly(tickets);
		case TicketsToShow.soldOutOnly:
			return soldOutOnly(tickets);
		default:
			return tickets;
	}
};

export default filters;
