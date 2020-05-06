import { useMemo } from 'react';
import { QueryHookOptions } from '@apollo/react-hooks';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';
import { EventsList, EventsQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

const useEventsQuery = <EventEdge extends EntityEdge>(
	queryOptions: QueryHookOptions<EventsList<EventEdge>, EventsQueryArgs>
): EventEdge['nodes'] => {
	const { data } = useCacheQuery<EventsList<EventEdge>>(queryOptions);

	const nodes = data?.espressoEvents?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useEventsQuery;
