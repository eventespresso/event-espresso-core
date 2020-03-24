import useUpdateTicketCache from './useUpdateTicketCache';
import { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';

const useOnUpdateTicket = (): TicketMutationCallbackFn => {
	const { updateRelations, addRelation, removeRelation } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onUpdateTicket = ({ proxy, tickets, ticket, datetimeIds, priceIds }: TicketMutationCallbackFnArgs): void => {
		if (ticket.id && datetimeIds && datetimeIds.length) {
			const { id: ticketId } = ticket;

			// make sure to remove ticket from
			// all existing relations
			removeRelation({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
			});

			updateRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'datetimes',
				relationIds: datetimeIds,
			});

			datetimeIds.forEach((entityId: string) => {
				addRelation({
					entity: 'datetimes',
					entityId,
					relation: 'tickets',
					relationId: ticketId,
				});
			});
		}

		if (ticket.id && priceIds && priceIds.length) {
			const { id: ticketId } = ticket;

			// make sure to remove ticket from
			// all existing relations
			removeRelation({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
			});

			updateRelations({
				entity: 'tickets',
				entityId: ticketId,
				relation: 'prices',
				relationIds: priceIds,
			});

			priceIds.forEach((entityId: string) => {
				addRelation({
					entity: 'prices',
					entityId,
					relation: 'tickets',
					relationId: ticketId,
				});
			});
			// Update ticket cache.
			updateTicketCache({ proxy, tickets, ticket, action: 'update' });
		}
	};

	return onUpdateTicket;
};

export default useOnUpdateTicket;
