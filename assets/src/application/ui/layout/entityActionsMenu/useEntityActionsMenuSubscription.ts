import { useEffect } from 'react';

import { useEntityActions } from '@appLayout/entityActionsMenu';
import useDatesActionMenuHandler from '../../../../domain/eventEditor/ui/datetimes/hooks/useDatesActionMenuHandler';
import useTicketsActionMenuHandler from '../../../../domain/eventEditor/ui/tickets/hooks/useTicketsActionMenuHandler';
import { Domain, SubscriptionsOptions } from './types';

const useEntityActionsMenuSubscription = () => {
	const { subscribe } = useEntityActions<Domain>('eventEditor');
	const datesActionHandler = useDatesActionMenuHandler();
	const ticketsActionHandler = useTicketsActionMenuHandler();

	useEffect(() => {
		const unsubscribeDatesAction = subscribe(datesActionHandler, { entityType: 'datetime' });
		const unsubscribeTicketsAction = subscribe(ticketsActionHandler, { entityType: 'ticket' });

		return () => {
			unsubscribeDatesAction();
			unsubscribeTicketsAction();
		};
	}, []);
};

export default useEntityActionsMenuSubscription;
