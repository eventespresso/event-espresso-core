import useTicketQueryOptions from '../../queries/tickets/useTicketQueryOptions';
import { CacheUpdaterFn, CacheUpdaterFnArgs } from '../types';
import { ReadQueryOptions, WriteQueryOptions } from '../../queries/types';
import { Ticket } from '../../types';

const useUpdateTicketCache = (): CacheUpdaterFn => {
	const queryOptions: ReadQueryOptions = useTicketQueryOptions();

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
		proxy.writeQuery(writeOptions);
	};

	return updateTicketCache;
};

export default useUpdateTicketCache;
