import { useMemo } from 'react';

import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime, DatetimeEdge } from '../../types';
import { useDatetimesQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';

const useDatetimes = (): Array<Datetime> => {
	const options = useDatetimeQueryOptions();
	const { data } = useDatetimesQuery<DatetimeEdge>(options);

	const nodes = data?.espressoDatetimes?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useDatetimes;
