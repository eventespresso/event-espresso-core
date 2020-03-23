import { parseISO, formatISO } from 'date-fns';

import { Ticket } from '@edtrServices/apollo';
import { TicketsToShow } from '@edtrServices/filterState';
import allOnSaleAndPending from './allOnSaleAndPending';
import expiredOnly from './expiredOnly';
import nextOnSaleOrPendingOnly from './nextOnSaleOrPendingOnly';
import onSaleOnly from './onSaleOnly';
import pendingOnly from './pendingOnly';
import percentSoldAtOrAbove from './percentSoldAtOrAbove';
import percentSoldBelow from './percentSoldBelow';
import soldOutOnly from './soldOutOnly';
import notTrashed from '../../../../services/predicates/filters/notTrashed';
import trashedOnly from '../../../../services/predicates/filters/trashedOnly';

import { FilterTickets } from './types';

export const now = parseISO(formatISO(new Date()));

/**
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const filters = ({ tickets, show = TicketsToShow.nextOnSaleOrPendingOnly }: FilterTickets): Ticket[] => {
	const noTrashedTickets = notTrashed(tickets);
	switch (show) {
		case TicketsToShow.above50Sold:
			return percentSoldAtOrAbove({ percentage: 50, tickets: noTrashedTickets });
		case TicketsToShow.above75Sold:
			return percentSoldAtOrAbove({ percentage: 75, tickets: noTrashedTickets });
		case TicketsToShow.above90Sold:
			return percentSoldAtOrAbove({ percentage: 90, tickets: noTrashedTickets });
		case TicketsToShow.all:
			// we don't normally want to show trashed tickets
			return noTrashedTickets;
		case TicketsToShow.trashedOnly:
			// unless the user specifically requests it
			return trashedOnly(tickets);
		case TicketsToShow.below50Sold:
			return percentSoldBelow({ percentage: 50, tickets: noTrashedTickets });
		case TicketsToShow.expiredOnly:
			return expiredOnly(noTrashedTickets);
		case TicketsToShow.nextOnSaleOrPendingOnly:
			return nextOnSaleOrPendingOnly(noTrashedTickets);
		case TicketsToShow.onSaleAndPending:
			return allOnSaleAndPending(noTrashedTickets);
		case TicketsToShow.onSaleOnly:
			return onSaleOnly(noTrashedTickets);
		case TicketsToShow.pendingOnly:
			return pendingOnly(noTrashedTickets);
		case TicketsToShow.soldOutOnly:
			return soldOutOnly(noTrashedTickets);
		default:
			return noTrashedTickets;
	}
};

export default filters;
