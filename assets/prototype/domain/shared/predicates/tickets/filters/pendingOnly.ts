/**
 * Internal dependencies
 */
import isPending from '../isPending';

const pendingOnly = (ticketEntities: any[]) => {
	return ticketEntities.filter((ticketEntity) => isPending(ticketEntity));
};

export default pendingOnly;
