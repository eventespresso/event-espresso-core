import { findIndex, update } from 'ramda';

import { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { Datetime, DatetimesList } from '@edtrServices/apollo/types';
import { WriteQueryOptions } from '@edtrServices/apollo/queries/types';
import { entityHasGuid } from '@sharedServices/predicates/selectionById';
import { useDatetimeQueryOptions } from '@edtrServices/apollo/queries/datetimes';

const useUpdateDatetimeCache = (): CacheUpdaterFn => {
	const queryOptions = useDatetimeQueryOptions();

	const updateDatetimeCache = ({ proxy, datetimes, datetime, action }: CacheUpdaterFnArgs): void => {
		const { nodes = [] } = datetimes;
		let newNodes: Array<Datetime>, datetimeIndex: number;
		switch (action) {
			case 'add':
				newNodes = [...nodes, datetime];
				break;
			case 'update':
				// find the index of the datetime to update
				datetimeIndex = findIndex(entityHasGuid(datetime.id), nodes);
				// if datetime exists
				if (datetimeIndex >= 0) {
					newNodes = update(datetimeIndex, datetime, nodes);
				}
				break;
			case 'remove':
				newNodes = nodes.filter(({ id }) => id !== datetime.id);
				break;
		}

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
