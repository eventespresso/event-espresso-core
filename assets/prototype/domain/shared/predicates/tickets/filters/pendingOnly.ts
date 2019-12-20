/**
 * Internal dependencies
 */
import isPending from '../isPending';

const pendingOnly = (tickets: any[]) => {
	return tickets.filter((ticket) => isPending(ticket));
};

export default pendingOnly;
