import isOnSale from '../../isOnSale';
import { Ticket } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const onSaleOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter((ticket) => isOnSale(ticket));
};

export default onSaleOnly;
