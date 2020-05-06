import { useMemo } from 'react';
import { QueryHookOptions } from '@apollo/react-hooks';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';
import { DatetimesList, DatetimesQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

const useDatetimesQuery = <DatetimeEdge extends EntityEdge>(
	queryOptions: QueryHookOptions<DatetimesList<DatetimeEdge>, DatetimesQueryArgs>
): DatetimeEdge['nodes'] => {
	const { data } = useCacheQuery<DatetimesList<DatetimeEdge>>(queryOptions);

	const nodes = data?.espressoDatetimes?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useDatetimesQuery;
