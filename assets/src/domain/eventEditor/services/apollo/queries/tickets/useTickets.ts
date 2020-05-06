import { useMemo } from 'react';

import useTicketQueryOptions from './useTicketQueryOptions';
import { Ticket, TicketsList } from '../../types';
import { useCacheQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';

const useTickets = (): Array<Ticket> => {
	const options = useTicketQueryOptions();
	const { data } = useCacheQuery<TicketsList>(options);

	const nodes = data?.espressoTickets?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useTickets;
