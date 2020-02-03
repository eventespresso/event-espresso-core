/**
 * Internal dependencies
 */
import isTrashed from '../../isTrashed';
import { Ticket } from '../../../../../../eventEditor/data/types';

const archivedOnly = (tickets: Ticket[]): Ticket[] => {
	return tickets.filter((ticket) => isTrashed(ticket));
};

export default archivedOnly;
