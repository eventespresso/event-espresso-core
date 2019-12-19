/**
 * Internal dependencies
 */
import isExpired from '../isExpired';

const expiredOnly = (ticketEntities: any[]) => {
	return ticketEntities.filter((ticketEntity) => isExpired(ticketEntity));
};

export default expiredOnly;
