import updatePriceCache from './updatePriceCache';
import useUpdateTicketCache from './useUpdateTicketCache';
import { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';
import { getGuids } from '@appServices/predicates';

const useOnDeleteTicket = (): TicketMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onDeleteTicket = ({ proxy, tickets, ticket, deletePermanently }: TicketMutationCallbackFnArgs): void => {
		const action = deletePermanently ? 'remove' : 'update';
		if (ticket.id && deletePermanently) {
			const { nodes = [] } = tickets;
			const ticketIn = getGuids(nodes);
			const { id: ticketId } = ticket;

			// Update prices cache for the changed tickets,
			// to avoid refetching of prices.
			updatePriceCache({ proxy, ticketIn, ticketId, action });

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
		// Update ticket cache after price cache is updated.
		updateTicketCache({ proxy, tickets, ticket: { ...ticket, isTrashed: true }, action });
	};

	return onDeleteTicket;
};

export default useOnDeleteTicket;
