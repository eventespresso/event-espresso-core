/**
 * Internal dependencies
 */
import isArchived from '../isArchived';

const archivedOnly = (ticketEntities: any[]) => {
	return ticketEntities.filter((ticketEntity) => isArchived(ticketEntity));
};

export default archivedOnly;
