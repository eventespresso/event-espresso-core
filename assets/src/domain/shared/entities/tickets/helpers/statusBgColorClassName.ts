import { Ticket } from '@edtrServices/apollo/types';
import { isExpired, isOnSale, isPending, isSoldOut } from '../predicates';

const statusBgColorClassName = (ticket: Ticket): string => {
	if (ticket.isTrashed) {
		return 'ee-status-background-color-TKA';
	}
	if (isExpired({ ticket })) {
		return 'ee-status-background-color-TKE';
	}
	if (isOnSale(ticket)) {
		return 'ee-status-background-color-TKO';
	}
	if (isPending(ticket)) {
		return 'ee-status-background-color-TKP';
	}
	if (isSoldOut(ticket)) {
		return 'ee-status-background-color-TKS';
	}
	return 'ee-status-background-color-TKT';
};

export default statusBgColorClassName;
