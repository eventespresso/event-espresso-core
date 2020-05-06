import { useMemo } from 'react';

import useTicketQueryOptions from './useTicketQueryOptions';
import { Ticket, TicketEdge } from '../../types';
import { useTicketsQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';

const useTickets = (): Array<Ticket> => {
	const options = useTicketQueryOptions();

	const { data } = useTicketsQuery<TicketEdge>(options);

	const nodes = data?.espressoTickets?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useTickets;
