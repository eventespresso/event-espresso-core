import { Ticket } from '@edtrServices/apollo';
import { TicketsSales } from '@edtrServices/filterState';
import percentSoldAtOrAbove from './percentSoldAtOrAbove';
import percentSoldBelow from './percentSoldBelow';

import { SalesFilter } from './types';

/**
 * reduces tickets array based on value of the "sales" filter
 *
 * @param {Array} tickets    original tickets array
 * @param {string} show    value for the "show" filter
 * @return {Array}         filtered tickets array
 */
export const salesFilter = ({ tickets, sales = TicketsSales.all }: SalesFilter): Ticket[] => {
	switch (sales) {
		case TicketsSales.above50Sold:
			return percentSoldAtOrAbove({ percentage: 50, tickets });
		case TicketsSales.above75Sold:
			return percentSoldAtOrAbove({ percentage: 75, tickets });
		case TicketsSales.above90Sold:
			return percentSoldAtOrAbove({ percentage: 90, tickets });
		case TicketsSales.below50Sold:
			return percentSoldBelow({ percentage: 50, tickets });
		default:
			return tickets;
	}
};

export default salesFilter;
