import { useMemo } from 'react';

import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime, DatetimesList } from '../../types';
import useCacheQuery from '@dataServices/apollo/queries/useCacheQuery';
import { getCacheIds } from '@appServices/predicates';

const useDatetimes = (): Array<Datetime> => {
	const options = useDatetimeQueryOptions();
	const { data } = useCacheQuery<DatetimesList>(options);

	const nodes = data?.espressoDatetimes?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default useDatetimes;
