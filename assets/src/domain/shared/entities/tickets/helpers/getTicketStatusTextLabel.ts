import { __ } from '@wordpress/i18n';

import status from './status';
import { Ticket } from '@edtrServices/apollo/types';
import { TICKET_STATUS_ID } from '../constants';

const getTicketStatusTextLabel = (ticket: Ticket): string => {
	let ticketStatus = '';
	switch (status(ticket)) {
		case TICKET_STATUS_ID.SOLD_OUT:
			ticketStatus = __('sold out', 'event_espresso');
			break;
		case TICKET_STATUS_ID.EXPIRED:
			ticketStatus = __('expired', 'event_espresso');
			break;
		case TICKET_STATUS_ID.PENDING:
			ticketStatus = __('pending', 'event_espresso');
			break;
		case TICKET_STATUS_ID.ONSALE:
			ticketStatus = __('on sale', 'event_espresso');
			break;
		case TICKET_STATUS_ID.ARCHIVED:
			ticketStatus = __('archived', 'event_espresso');
			break;
	}
	return ticketStatus;
};

export default getTicketStatusTextLabel;
