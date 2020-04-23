import { useCallback } from 'react';

import { Ticket, TicketEdge } from '../../types';
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
			const espressoTickets: TicketEdge = {
				nodes: updatedEntities,
				__typename: 'EspressoRootQueryTicketsConnection',
			};
			updateTicketList({
				...queryOptions,
				data: {
					espressoTickets,
				},
			});
		},
		[queryOptions, updateTicketList]
	);

	const sortResponder = useCallback<SortResponder>(
		({ destination, source }) => {
			const noDestination = !destination;
			const noChange = source?.index === destination?.index && destination?.droppableId === source?.droppableId;
			const notOurListOfInterest = destination?.droppableId !== 'ticket-entities-table-view-droppable';

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

export default useReorderTickets;
