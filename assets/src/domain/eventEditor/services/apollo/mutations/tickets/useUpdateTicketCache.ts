import { findIndex, update } from 'ramda';

import { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { Ticket, TicketsList } from '@edtrServices/apollo/types';
import { WriteQueryOptions } from '@edtrServices/apollo/queries/types';
import { entityHasGuid } from '@sharedServices/predicates/selectionById';
import { useTicketQueryOptions } from '@edtrServices/apollo/queries';

const useUpdateTicketCache = (): CacheUpdaterFn => {
	const queryOptions = useTicketQueryOptions();

	const updateTicketCache = ({ proxy, tickets, ticket, action }: CacheUpdaterFnArgs): void => {
		const { nodes = [] } = tickets;
		let newNodes: Array<Ticket>, ticketIndex: number;
		switch (action) {
			case 'add':
				newNodes = [...nodes, ticket];
				break;
			case 'update':
				// find the index of the ticket to update
				ticketIndex = findIndex(entityHasGuid(ticket.id), nodes);
				// if ticket exists
				if (ticketIndex >= 0) {
					newNodes = update(ticketIndex, ticket, nodes);
				}
				break;
			case 'remove':
				newNodes = nodes.filter(({ id }) => id !== ticket.id);
				break;
			default:
				newNodes = nodes;
				break;
		}

		// write the data to cache without
		// mutating the cache directly
		const writeOptions: WriteQueryOptions = {
			...queryOptions,
			data: {
				espressoTickets: {
					...tickets,
					nodes: newNodes,
				},
			},
		};
		proxy.writeQuery<TicketsList>(writeOptions);
	};

	return updateTicketCache;
};

export default useUpdateTicketCache;
