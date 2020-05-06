import { useMemo } from 'react';
import { QueryHookOptions } from '@apollo/react-hooks';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';
import { TicketsList, TicketsQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

const useTicketsQuery = <TicketEdge extends EntityEdge>(
	queryOptions: QueryHookOptions<TicketsList<TicketEdge>, TicketsQueryArgs>
): TicketEdge['nodes'] => {
	const { data } = useCacheQuery<TicketsList<TicketEdge>>(queryOptions);

	const nodes = data?.espressoTickets?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useTicketsQuery;
