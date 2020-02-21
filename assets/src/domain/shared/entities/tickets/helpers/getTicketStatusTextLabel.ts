import { __ } from '@wordpress/i18n';

import status from './status';
import { Ticket } from '@edtrServices/apollo/types';
import { TICKET_STATUS_ID } from '../constants';

const getTicketStatusTextLabel = (ticket: Ticket): string => {
	let ticketStatus = '';
	switch (status(ticket)) {
		case TICKET_STATUS_ID.TRASHED:
			ticketStatus = __('trashed');
			break;
		case TICKET_STATUS_ID.EXPIRED:
			ticketStatus = __('expired');
			break;
		case TICKET_STATUS_ID.SOLD_OUT:
			ticketStatus = __('sold out');
			break;
		case TICKET_STATUS_ID.PENDING:
			ticketStatus = __('pending');
			break;
		case TICKET_STATUS_ID.ONSALE:
			ticketStatus = __('on sale');
			break;
	}
	return ticketStatus;
};

export default getTicketStatusTextLabel;
