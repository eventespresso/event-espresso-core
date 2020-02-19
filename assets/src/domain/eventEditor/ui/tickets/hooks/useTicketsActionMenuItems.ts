import React from 'react';

import { Ticket } from '../../../services/apollo/types';
import { useEntityActionsMenuItems, EntityType, MenuKey, ActionsMenuItemProps } from '@appLayout/entityActionsMenu';
import { AdditionalTicketMenuOptions } from '../types';

const useTicketsActionMenuItems = (ticket: Ticket, menuItemProps?: ActionsMenuItemProps): Array<React.ReactNode> => {
	return useEntityActionsMenuItems<Ticket, EntityType, MenuKey, AdditionalTicketMenuOptions>('ticket', ticket, {
		ticketMenuItemProps: menuItemProps,
	});
};

export default useTicketsActionMenuItems;
