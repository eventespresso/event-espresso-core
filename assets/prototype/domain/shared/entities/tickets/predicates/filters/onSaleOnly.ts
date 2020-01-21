/**
 * Internal dependencies
 */
import isOnSale from '../isOnSale';
import { Ticket } from '../../../../../eventEditor/data/types';

const onSaleOnly = (tickets: Ticket[]) => {
	return tickets.filter((ticket) => isOnSale(ticket));
};

export default onSaleOnly;
