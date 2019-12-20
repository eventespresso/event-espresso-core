import archivedOnly from './archivedOnly';
import expiredOnly from './expiredOnly';
import nextOnSaleOrPendingOnly from './nextOnSaleOrPendingOnly';
import onSaleAndPending from './onSaleAndPending';
import onSaleOnly from './onSaleOnly';
import pendingOnly from './pendingOnly';
import percentSoldAtOrAbove from './percentSoldAtOrAbove';
import percentSoldBelow from './percentSoldBelow';
import soldOutOnly from './soldOutOnly';

export const now = new Date();

interface FilterTickets {
	tickets: any[];
	show?: string;
}

/**
 * filterTickets
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const filters = ({ tickets, show = 'on-sale-and-pending' }: FilterTickets) => {
	switch (show) {
		case 'all':
			return tickets;
		case 'on-sale-and-pending':
			return onSaleAndPending(tickets);
		case 'on-sale-only':
			return onSaleOnly(tickets);
		case 'pending-only':
			return pendingOnly(tickets);
		case 'next-on-sale-or-pending-only':
			return nextOnSaleOrPendingOnly(tickets);
		case 'sold-out-only':
			return soldOutOnly(tickets);
		case 'above-90-sold':
			return percentSoldAtOrAbove({ maxQuantity: 90, tickets });
		case 'above-75-sold':
			return percentSoldAtOrAbove({ maxQuantity: 75, tickets });
		case 'above-50-sold':
			return percentSoldAtOrAbove({ maxQuantity: 50, tickets });
		case 'below-50-sold':
			return percentSoldBelow({ maxQuantity: 50, tickets });
		case 'expired-only':
			return expiredOnly(tickets);
		case 'archived-only':
			return archivedOnly(tickets);
	}
	return tickets;
};

export default filters;
