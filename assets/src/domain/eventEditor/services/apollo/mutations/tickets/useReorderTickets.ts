import { useCallback } from 'react';

import { Ticket } from '../../types';
import useReorderEntities from '../useReorderEntities';
import { EntityTableProps } from '@appLayout/entityList';
import { TicketsFilterStateManager as DFSM } from '@edtrServices/filterState';
import { useTickets, useTicketQueryOptions } from '@edtrServices/apollo/queries';
import { useUpdateTicketList } from '@edtrHooks/index';

type SortResponder = EntityTableProps<Ticket, DFSM>['onSort'];

interface ReorderTickets {
	sortResponder: SortResponder;
}

const useReorderTickets = (filteredEntities: Array<Ticket>): ReorderTickets => {
	const { sortEntities } = useReorderEntities<Ticket>({ entityType: 'TICKET' });
	const allEntities = useTickets();
	const queryOptions = useTicketQueryOptions();
	const updateTicketList = useUpdateTicketList();

	const updateEntityList = useCallback(
		(updatedEntities) => {
			updateTicketList({
				...queryOptions,
				data: {
					espressoTickets: {
						nodes: updatedEntities,
						__typename: 'EspressoRootQueryTicketsConnection',
					},
				},
			});
		},
		[queryOptions, updateTicketList]
	);

	const sortResponder = useCallback<SortResponder>(
		({ destination, source }) => {
			if (
				!destination ||
				(source.index === destination.index && destination.droppableId === source.droppableId) ||
				destination.droppableId !== 'ticket-entities-table-view-droppable'
			) {
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

export default useReorderTickets;
