import { Ticket } from '@edtrServices/apollo/types';
import isExpired from '../predicates/isExpired';
import isOnSale from '../predicates/isOnSale';
import isPending from '../predicates/isPending';
import isSoldOut from '../predicates/isSoldOut';
import isTrashed from '../../../services/predicates/isTrashed';
import { TICKET_STATUS_ID } from '../constants';

const status = (ticket: Ticket): string => {
	if (isExpired({ ticket })) {
		return TICKET_STATUS_ID.EXPIRED;
	}
	if (isOnSale(ticket)) {
		return TICKET_STATUS_ID.ONSALE;
	}
	if (isPending(ticket)) {
		return TICKET_STATUS_ID.PENDING;
	}
	if (isSoldOut(ticket)) {
		return TICKET_STATUS_ID.SOLD_OUT;
	}
	if (isTrashed(ticket)) {
		return TICKET_STATUS_ID.ARCHIVED;
	}
	return '';
};

export default status;
