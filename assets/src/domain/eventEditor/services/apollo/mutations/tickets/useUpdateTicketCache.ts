import useTicketQueryOptions from '../../queries/tickets/useTicketQueryOptions';
import { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { WriteQueryOptions } from '../../queries/types';
import { Ticket, TicketsList } from '../../types';

const useUpdateTicketCache = (): CacheUpdaterFn => {
	const queryOptions = useTicketQueryOptions();

	const updateTicketCache = ({ proxy, tickets, ticket, remove = false }: CacheUpdaterFnArgs): void => {
		const { nodes = [] } = tickets;
		// remove from or add to the list
		const newNodes: Ticket[] = remove ? nodes.filter(({ id }: Ticket) => id !== ticket.id) : [...nodes, ticket];

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
