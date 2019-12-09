import useRelations from '../../../../../infrastructure/services/relations/useRelations';

import useUpdateTicketCache from './useUpdateTicketCache';
import updatePriceCache from './updatePriceCache';

const useOnCreateTicket = () => {
	const { updateRelations, addRelation } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onCreateTicket = ({ proxy, datetimeIds, ticket, tickets, prices }) => {
		if (ticket.id) {
			const { nodes = [] } = tickets;
			const ticketIn = nodes.map(({ id }) => id);
			const { id: ticketId } = ticket;

			// Update prices cache for the changed tickets,
			// to avoid refetching of prices.
			updatePriceCache({ proxy, prices, ticketIn, ticketId });

			// Set relations with datetimes
			updateRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
				relationIds: datetimeIds,
			});
			tickets.forEach((entityId) => {
				addRelation({
					entity: 'datetimes',
					entityId,
					relation: 'tickets',
					relationId: ticketId,
				});
			});

			// Set relations with prices
			const priceIds = prices.map(({ id }) => id);
			updateRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
				relationIds: priceIds,
			});
			priceIds.forEach((entityId) => {
				addRelation({
					entity: 'prices',
					entityId,
					relation: 'tickets',
					relationId: ticketId,
				});
			});
		}
		// Update ticket cache after tickets cache is updated.
		updateTicketCache({ proxy, tickets, ticket });
	};

	return onCreateTicket;
};

export default useOnCreateTicket;
