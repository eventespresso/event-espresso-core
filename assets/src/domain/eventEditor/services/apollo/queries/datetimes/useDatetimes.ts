import useDatetimeQueryOptions from './useDatetimeQueryOptions';
import { Datetime, DatetimeEdge } from '../../types';
import { getCacheIds } from '@appServices/predicates';
import { useMemoStringify } from '@appServices/hooks';
import { useDatetimesQuery } from '@dataServices/apollo/queries';

const useDatetimes = (): Array<Datetime> => {
	const options = useDatetimeQueryOptions();
	const { data } = useDatetimesQuery<DatetimeEdge>(options);

	const nodes = data?.espressoDatetimes?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	return useMemoStringify(nodes, cacheIds);
};

export default useDatetimes;
