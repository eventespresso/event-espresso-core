import isOnSale from '../../isOnSale';
import { TicketFilterFn } from '../types';

const onSaleOnly: TicketFilterFn = (tickets) => {
	return tickets.filter((ticket) => isOnSale(ticket));
};

export default onSaleOnly;
