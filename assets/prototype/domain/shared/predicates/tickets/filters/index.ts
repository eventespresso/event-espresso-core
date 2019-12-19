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

interface FilterTicketEntities {
	ticketEntities: any[];
	show?: string;
}

/**
 * filterTicketEntities
 * reduces tickets array based on value of the "show" filter
 *
 * @param {Array} ticketEntities    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
const filters = ({ ticketEntities, show = 'on-sale-and-pending' }: FilterTicketEntities) => {
	switch (show) {
		case 'all':
			return ticketEntities;
		case 'on-sale-and-pending':
			return onSaleAndPending(ticketEntities);
		case 'on-sale-only':
			return onSaleOnly(ticketEntities);
		case 'pending-only':
			return pendingOnly(ticketEntities);
		case 'next-on-sale-or-pending-only':
			return nextOnSaleOrPendingOnly(ticketEntities);
		case 'sold-out-only':
			return soldOutOnly(ticketEntities);
		case 'above-90-sold':
			return percentSoldAtOrAbove({ maxQuantity: 90, ticketEntities });
		case 'above-75-sold':
			return percentSoldAtOrAbove({ maxQuantity: 75, ticketEntities });
		case 'above-50-sold':
			return percentSoldAtOrAbove({ maxQuantity: 50, ticketEntities });
		case 'below-50-sold':
			return percentSoldBelow({ maxQuantity: 50, ticketEntities });
		case 'expired-only':
			return expiredOnly(ticketEntities);
		case 'archived-only':
			return archivedOnly(ticketEntities);
	}
	return ticketEntities;
};

export default filters;
