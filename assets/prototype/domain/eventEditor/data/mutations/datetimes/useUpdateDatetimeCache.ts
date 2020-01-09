import useDatetimeQueryOptions from '../../queries/datetimes/useDatetimeQueryOptions';
import { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { ReadQueryOptions, WriteQueryOptions } from '../../queries/types';
import { Datetime, DatetimesList } from '../../types';

const useUpdateDatetimeCache = (): CacheUpdaterFn => {
	const queryOptions: ReadQueryOptions = useDatetimeQueryOptions();

	const updateDatetimeCache = ({ proxy, datetimes, datetime, remove = false }: CacheUpdaterFnArgs): void => {
		const { nodes = [] } = datetimes;
		// remove from or add to the list
		const newNodes: Datetime[] = remove
			? nodes.filter(({ id }: Datetime) => id !== datetime.id)
			: [...nodes, datetime];

		// write the data to cache without
		// mutating the cache directly
		const writeOptions: WriteQueryOptions = {
			...queryOptions,
			data: {
				espressoDatetimes: {
					...datetimes,
					nodes: newNodes,
				},
			},
		};
		proxy.writeQuery<DatetimesList>(writeOptions);
	};

	return updateDatetimeCache;
};

export default useUpdateDatetimeCache;
