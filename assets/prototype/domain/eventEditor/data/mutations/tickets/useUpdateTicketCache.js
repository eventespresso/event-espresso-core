import useTicketQueryOptions from '../../queries/tickets/useTicketQueryOptions';

const useUpdateTicketCache = () => {
	const options = useTicketQueryOptions();

	const updateTicketCache = ({ proxy, tickets, ticket, remove = false }) => {
		const { nodes = [] } = tickets;
		// remove from or add to the list
		const newNodes = remove ? nodes.filter(({ id }) => id !== ticket.id) : [...nodes, ticket];

		// write the data to cache without
		// mutating the cache directly
		proxy.writeQuery({
			...options,
			data: {
				tickets: {
					...tickets,
					nodes: newNodes,
				},
			},
		});
	};

	return updateTicketCache;
};

export default useUpdateTicketCache;
