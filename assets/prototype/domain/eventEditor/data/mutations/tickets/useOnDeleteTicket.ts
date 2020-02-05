import { useRelations, RelationsManager } from '../../../../../application/services/apollo/relations';
import { TicketMutationCallbackFn, TicketMutationCallbackFnArgs, CacheUpdaterFn } from '../types';
import useUpdateTicketCache from './useUpdateTicketCache';
import updatePriceCache from './updatePriceCache';
import { Ticket } from '../../types';

const useOnDeleteTicket = (): TicketMutationCallbackFn => {
	const { dropRelations, removeRelation } = useRelations() as RelationsManager;

	const updateTicketCache: CacheUpdaterFn = useUpdateTicketCache();

	const onDeleteTicket = ({ proxy, tickets, ticket }: TicketMutationCallbackFnArgs): void => {
		if (ticket.id) {
			const { nodes = [] } = tickets;
			const ticketIn: string[] = nodes.map(({ id }: Ticket) => id);
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
		// Update ticket cache after price cache is updated.
		updateTicketCache({ proxy, tickets, ticket, remove: true });
	};

	return onDeleteTicket;
};

export default useOnDeleteTicket;
