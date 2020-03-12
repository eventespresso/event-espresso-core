import { useEffect } from 'react';

import { useEntityActionsService } from '@appLayout/entityActionsMenu';
import useDatesActionMenuHandler from '../../ui/datetimes/hooks/useDatesActionMenuHandler';
import useTicketsActionMenuHandler from '../../ui/tickets/hooks/useTicketsActionMenuHandler';

const useEntityActionsMenuSubscription = (): void => {
	const { subscribe } = useEntityActionsService('eventEditor');
	const datesActionHandler = useDatesActionMenuHandler();
	const ticketsActionHandler = useTicketsActionMenuHandler();

	useEffect(() => {
		const unsubscribeDatesAction = subscribe(datesActionHandler, { entityType: 'datetime' });
		const unsubscribeTicketsAction = subscribe(ticketsActionHandler, { entityType: 'ticket' });

		return (): void => {
			unsubscribeDatesAction();
			unsubscribeTicketsAction();
		};
	}, []);
};

export default useEntityActionsMenuSubscription;
