import { useCallback } from 'react';

import useAddDateActionMenuItems from './useAddDateActionMenuItems';
import useAddTicketActionMenuItems from './useAddTicketActionMenuItems';
import { SubscriptionCallback } from './types';
import { Datetime, Ticket } from '../../services/apollo/types';

const useEntityActionHandler = (): SubscriptionCallback => {
	const registerDatesMenu = useAddDateActionMenuItems();
	const registerTicketsMenu = useAddTicketActionMenuItems();

	return useCallback<SubscriptionCallback>(({ entityType, entity }, entityActionsManager) => {
		switch (entityType) {
			case 'datetime':
				registerDatesMenu(entity as Datetime, entityActionsManager);
				break;
			case 'ticket':
				registerTicketsMenu(entity as Ticket, entityActionsManager);
				break;
		}
	}, []);
};

export default useEntityActionHandler;
