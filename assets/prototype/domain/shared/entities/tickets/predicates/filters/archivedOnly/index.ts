/**
 * Internal dependencies
 */
import isArchived from '../../isArchived';
import { Ticket } from '../../../../../../eventEditor/data/types';

const archivedOnly = (tickets: Ticket[]) => {
	return tickets.filter((ticket) => isArchived(ticket));
};

export default archivedOnly;
