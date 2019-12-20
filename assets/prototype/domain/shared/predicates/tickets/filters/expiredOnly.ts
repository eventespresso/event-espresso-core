/**
 * Internal dependencies
 */
import isExpired from '../isExpired';

const expiredOnly = (tickets: any[]) => {
	return tickets.filter((ticket) => isExpired(ticket));
};

export default expiredOnly;
