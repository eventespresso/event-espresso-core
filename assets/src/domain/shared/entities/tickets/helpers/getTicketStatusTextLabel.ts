const getTicketStatusTextLabel = (ticketEntity) => {
	let ticketStatus = '';
	switch (status(ticketEntity)) {
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
