import { useEffect } from 'react';

import { useEntityActions } from '@appLayout/entityActionMenu';
import useDatesActionMenuHandler from '../datetimes/hooks/useDatesActionMenuHandler';
import useTicketsActionMenuHandler from '../tickets/hooks/useTicketsActionMenuHandler';
import { DateMenuKey, TicketMenuKey, Domain, EntityType } from './types';

const useEntityActionMenuSubscription = () => {
	const { subscribe } = useEntityActions<Domain, EntityType, DateMenuKey | TicketMenuKey>('eventEditor');
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

export default useEntityActionMenuSubscription;
