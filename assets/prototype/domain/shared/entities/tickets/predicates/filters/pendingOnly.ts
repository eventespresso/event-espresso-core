/**
 * Internal dependencies
 */
import isPending from '../isPending';
import { Ticket } from '../../../../../eventEditor/data/types';

const pendingOnly = (tickets: Ticket[]) => {
	return tickets.filter((ticket) => isPending(ticket));
};

export default pendingOnly;
