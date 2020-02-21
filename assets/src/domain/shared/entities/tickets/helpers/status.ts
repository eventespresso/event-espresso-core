import { Ticket } from '@edtrServices/apollo/types';
import isTrashed from '../../../services/predicates/isTrashed';
import { TICKET_STATUS_ID } from '../constants';

const status = (ticket: Ticket) => {
	if (isExpired(ticketEntity)) {
		return TICKET_STATUS_ID.EXPIRED;
	}
	if (isOnSale(ticketEntity)) {
		return TICKET_STATUS_ID.ONSALE;
	}
	if (isPending(ticketEntity)) {
		return TICKET_STATUS_ID.PENDING;
	}
	if (isSoldOut(ticketEntity)) {
		return TICKET_STATUS_ID.SOLD_OUT;
	}
	if (isTrashed(ticket)) {
		return TICKET_STATUS_ID.ARCHIVED;
	}
	return '';
};

export default status;
