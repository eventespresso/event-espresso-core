import React from 'react';

import { Ticket } from '@edtrServices/apollo/types';
import { useEntityActionsMenuItems } from '@edtrHooks/index';

const useTicketsActionMenuItems = (ticket: Ticket): Array<React.ReactNode> => {
	return useEntityActionsMenuItems<Ticket>('ticket', ticket);
};

export default useTicketsActionMenuItems;
