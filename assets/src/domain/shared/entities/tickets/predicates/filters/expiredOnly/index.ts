import isExpired from '../../isExpired';
import { Ticket } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const expiredOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter((ticket) => isExpired(ticket));
};

export default expiredOnly;
