import { useEffect } from 'react';

import { useFilterBarUISubscription as useAppFilterBarUISubscription } from '@appLayout/entityList/filterBar';
import useDatesListFilterBar from '../../ui/datetimes/hooks/useDatesListFilterBar';
import useTicketsListFilterBar from '../../ui/tickets/hooks/useTicketsListFilterBar';
import { domain } from '@edtrServices/constants';

const useFilterBarUISubscription = (): void => {
	const { subscribe } = useAppFilterBarUISubscription(domain);
	const datesListFilterBar = useDatesListFilterBar();
	const ticketsListFilterBar = useTicketsListFilterBar();

	useEffect(() => {
		const unsubscribeDatesListFilterBar = subscribe(datesListFilterBar, { listId: 'dates-list' });
		const unsubscribeTicketsListFilterBar = subscribe(ticketsListFilterBar, { listId: 'tickets-list' });

		return (): void => {
			unsubscribeDatesListFilterBar();
			unsubscribeTicketsListFilterBar();
		};
	}, []);
};

export default useFilterBarUISubscription;
