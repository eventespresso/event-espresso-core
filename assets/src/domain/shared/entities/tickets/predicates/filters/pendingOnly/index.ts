import isPending from '../../isPending';
import { Ticket } from '../../../../../../../../prototype/domain/eventEditor/data/types';

const pendingOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter(isPending);
};

export default pendingOnly;
