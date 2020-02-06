import isPending from '../../isPending';
import { TicketFilterFn } from '../types';

const pendingOnly: TicketFilterFn = (tickets) => {
	return tickets.filter(isPending);
};

export default pendingOnly;
