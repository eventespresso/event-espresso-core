/**
 * Internal dependencies
 */
import isArchived from '../isArchived';

const archivedOnly = (tickets: any[]) => {
	return tickets.filter((ticket) => isArchived(ticket));
};

export default archivedOnly;
