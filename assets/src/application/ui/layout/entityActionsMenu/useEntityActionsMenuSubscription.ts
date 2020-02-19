import { useEffect } from 'react';

import { useEntityActions } from '@appLayout/entityActionsMenu';
import useDatesActionMenuHandler from '../../../../domain/eventEditor/ui/datetimes/hooks/useDatesActionMenuHandler';
import useTicketsActionMenuHandler from '../../../../domain/eventEditor/ui/tickets/hooks/useTicketsActionMenuHandler';
import { Domain } from './types';

const useEntityActionsMenuSubscription = <EntityType extends string, MenuKey extends string>() => {
	const { subscribe } = useEntityActions<Domain, EntityType, MenuKey>('eventEditor');
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
