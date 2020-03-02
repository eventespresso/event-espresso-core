import React from 'react';

import { TicketHeaderProps } from './types';

const TicketHeader: React.FC<TicketHeaderProps> = ({ ticket }) => {
	return <span>{ticket.name}</span>;
};

export default TicketHeader;
