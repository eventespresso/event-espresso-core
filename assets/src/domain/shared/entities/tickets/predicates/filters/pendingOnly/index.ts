import isPending from '../../isPending';
import { Ticket } from '../../../../../../eventEditor/services/apollo/types';

const pendingOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter(isPending);
};

export default pendingOnly;
