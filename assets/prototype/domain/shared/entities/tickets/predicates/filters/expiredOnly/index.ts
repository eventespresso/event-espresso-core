import isExpired from '../../isExpired';
import { Ticket } from '../../../../../../eventEditor/data/types';

const expiredOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter((ticket) => isExpired(ticket));
};

export default expiredOnly;
