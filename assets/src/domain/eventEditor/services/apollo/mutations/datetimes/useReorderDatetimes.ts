import { useCallback } from 'react';

import { Datetime } from '../../types';
import useReorderEntities from '../useReorderEntities';
import { EntityTableProps } from '@appLayout/entityList';
import { DatetimesFilterStateManager as DFSM } from '@edtrServices/filterState';
import { useDatetimes, useDatetimeQueryOptions } from '@edtrServices/apollo/queries';
import { useUpdateDatetimeList } from '@edtrHooks/index';

type SortResponder = EntityTableProps<Datetime, DFSM>['onSort'];

const useReorderDatetimes = (filteredEntities: Array<Datetime>): SortResponder => {
	const reorderEntities = useReorderEntities<Datetime>({ entityType: 'DATETIME' });
	const allEntities = useDatetimes();
	const queryOptions = useDatetimeQueryOptions();
	const updateDatetimeList = useUpdateDatetimeList();

	return useCallback<SortResponder>(
		({ destination, source }) => {
			if (
				!destination ||
				(source.index === destination.index && destination.droppableId === source.droppableId) ||
				destination.droppableId !== 'date-entities-table-view-droppable'
			) {
				return;
			}
			const updatedEntities = reorderEntities({
				allEntities,
				filteredEntities,
				newIndex: destination.index,
				oldIndex: source.index,
			});

			updateDatetimeList({
				...queryOptions,
				data: {
					espressoDatetimes: {
						nodes: updatedEntities,
						__typename: 'EspressoRootQueryDatetimesConnection',
					},
				},
			});
		},
		[filteredEntities, allEntities, reorderEntities]
	);
};

export default useReorderDatetimes;
