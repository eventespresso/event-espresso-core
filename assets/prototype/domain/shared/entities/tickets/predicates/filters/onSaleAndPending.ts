/**
 * Internal dependencies
 */
import isOnSale from '../isOnSale';
import isPending from '../isPending';
import { Ticket } from '../../../../../eventEditor/data/types';

const onSaleAndPending = (tickets: Ticket[]) => {
	return tickets.filter((ticket) => {
		return isOnSale(ticket) || isPending(ticket);
	});
};

export default onSaleAndPending;
