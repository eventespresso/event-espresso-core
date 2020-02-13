import React from 'react';

import { Ticket } from '../../../services/apollo/types';
import { useEntityActionMenuItems, TicketMenuKey, ActionsMenuItemProps } from '../../entityActionMenu';
import { AdditionalTicketMenuOptions } from '../types';

const useTicketsActionMenuItems = (ticket: Ticket, menuItemProps?: ActionsMenuItemProps): Array<React.ReactNode> => {
	return useEntityActionMenuItems<Ticket, TicketMenuKey, AdditionalTicketMenuOptions>('ticket', ticket, {
		ticketMenuItemProps: menuItemProps,
	});
};

export default useTicketsActionMenuItems;
