import React from 'react';
import { Ticket } from '../../services/apollo/types';

interface TicketRegistrationsLinkProps {
	ticket: Ticket;
}
const TicketRegistrationsLink: React.FC<TicketRegistrationsLinkProps> = ({ ticket }) => {
	// @todo add link
	return <span>{ticket.dbId}</span>;
};

export default TicketRegistrationsLink;
