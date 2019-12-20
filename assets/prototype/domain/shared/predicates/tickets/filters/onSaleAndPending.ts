/**
 * Internal dependencies
 */

import isOnSale from '../isOnSale';
import isPending from '../isPending';

const onSaleAndPending = (tickets: any[]) => {
	return tickets.filter((ticket) => {
		return isOnSale(ticket) || isPending(ticket);
	});
};

export default onSaleAndPending;
