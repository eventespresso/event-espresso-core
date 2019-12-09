import useRelations from '../../../../../infrastructure/services/relations/useRelations';

import useUpdateTicketCache from './useUpdateTicketCache';
import updatePriceCache from './updatePriceCache';

const useOnDeleteTicket = () => {
	const { dropRelations, removeRelation } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onDeleteTicket = ({ proxy, tickets, ticket }) => {
		if (ticket.id) {
			const { nodes = [] } = tickets;
			const ticketIn = nodes.map(({ id }) => id);
			const { id: ticketId } = ticket;

			// Update prices cache for the changed tickets,
			// to avoid refetching of prices.
			updatePriceCache({ proxy, ticketIn, ticketId, remove: true });

			// Remove the ticket from all datetime relations
			removeRelation({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
			});
			// Remove the ticket from all price relations
			removeRelation({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
			});
			// Drop all the relations for the ticket
			dropRelations({
				entity: 'tickets',
				entityId: ticketId,
			});
		}
		// Update ticket cache after datetimes cache is updated.
		updateTicketCache({ proxy, tickets, ticket, remove: true });
	};

	return onDeleteTicket;
};

export default useOnDeleteTicket;
