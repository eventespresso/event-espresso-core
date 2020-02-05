import isPending from '../../isPending';
import { Ticket } from '../../../../../../eventEditor/data/types';

const pendingOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter(isPending);
};

export default pendingOnly;
