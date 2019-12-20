/**
 * Internal dependencies
 */
import isOnSale from '../isOnSale';

const onSaleOnly = (tickets: any[]) => {
	return tickets.filter((ticket) => isOnSale(ticket));
};

export default onSaleOnly;
