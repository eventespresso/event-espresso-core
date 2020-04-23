import { useCallback } from 'react';

import { Datetime, DatetimeEdge } from '../../types';
import useReorderEntities from '../useReorderEntities';
import { EntityTableProps } from '@appLayout/entityList';
import { DatetimesFilterStateManager as DFSM } from '@edtrServices/filterState';
import { useDatetimes, useDatetimeQueryOptions } from '@edtrServices/apollo/queries';
import { useUpdateDatetimeList } from '@edtrHooks/index';

type SortResponder = EntityTableProps<Datetime, DFSM>['onSort'];

interface ReorderDatetimes {
	sortResponder: SortResponder;
}

const useReorderDatetimes = (filteredEntities: Array<Datetime>): ReorderDatetimes => {
	const { sortEntities } = useReorderEntities<Datetime>({ entityType: 'DATETIME' });
	const allEntities = useDatetimes();
	const queryOptions = useDatetimeQueryOptions();
	const updateDatetimeList = useUpdateDatetimeList();

	const updateEntityList = useCallback(
		(updatedEntities) => {
			const espressoDatetimes: DatetimeEdge = {
				nodes: updatedEntities,
				__typename: 'EspressoRootQueryDatetimesConnection',
			};
			updateDatetimeList({
				...queryOptions,
				data: {
					espressoDatetimes,
				},
			});
		},
		[queryOptions, updateDatetimeList]
	);

	const sortResponder = useCallback<SortResponder>(
		({ destination, source }) => {
			const noDestination = !destination;
			const noChange = source?.index === destination?.index && destination?.droppableId === source?.droppableId;
			const notOurListOfInterest = destination?.droppableId !== 'date-entities-table-view-droppable';

			if (noDestination || noChange || notOurListOfInterest) {
				return;
			}
			sortEntities({
				allEntities,
				filteredEntities,
				newIndex: destination.index,
				oldIndex: source.index,
				updateEntityList,
			});
		},
		[filteredEntities, allEntities, sortEntities, updateEntityList]
	);

	return { sortResponder };
};

export default useReorderDatetimes;
