import { Ticket } from '@edtrServices/apollo/types';
import isExpired from '../predicates/isExpired';
import isOnSale from '../predicates/isOnSale';
import isSoldOut from '../predicates/isSoldOut';
import isTrashed from '../../../services/predicates/isTrashed';
import { TICKET_STATUS_ID } from '../constants';

const status = (ticket: Ticket): string => {
	if (isTrashed(ticket)) {
		console.log('ticket', ticket);
		return TICKET_STATUS_ID.TRASHED;
	}

	if (isExpired({ ticket })) {
		return TICKET_STATUS_ID.EXPIRED;
	}

	if (isSoldOut(ticket)) {
		return TICKET_STATUS_ID.SOLD_OUT;
	}

	if (isOnSale(ticket)) {
		return TICKET_STATUS_ID.ONSALE;
	}

	return 'TKP';
};

export default status;
