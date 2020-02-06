import isExpired from '../../isExpired';
import { Ticket } from '../../../../../../eventEditor/services/apollo/types';

const expiredOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter((ticket) => isExpired(ticket));
};

export default expiredOnly;
