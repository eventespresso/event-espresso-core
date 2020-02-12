import React from 'react';

import { Ticket } from '../../../services/apollo/types';
import { useEntityActionMenuItems, TicketMenuKey } from '../../entityActionMenu';

const useTicketsActionMenuItems = (ticket: Ticket): Array<React.ReactNode> => {
	return useEntityActionMenuItems<Ticket, TicketMenuKey>('ticket', ticket);
};

export default useTicketsActionMenuItems;
