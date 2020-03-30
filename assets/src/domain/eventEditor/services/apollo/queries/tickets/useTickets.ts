import { useMemo } from 'react';

import useTicketQueryOptions from './useTicketQueryOptions';
import { Ticket, TicketsList } from '../../types';
import useCacheQuery from '../useCacheQuery';
import { getCacheIds } from '@sharedServices/predicates';

const useTickets = (): Array<Ticket> => {
	const options = useTicketQueryOptions();
	const { data } = useCacheQuery<TicketsList>({ ...options, fetchPolicy: 'cache-first' });

	const nodes = data?.espressoTickets?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useTickets;
