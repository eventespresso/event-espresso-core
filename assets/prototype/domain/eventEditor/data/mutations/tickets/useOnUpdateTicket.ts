import { useRelations, RelationsManager } from '../../../../../application/services/apollo/relations';
import { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';

const useOnUpdateTicket = (): TicketMutationCallbackFn => {
	const { updateRelations, addRelation, removeRelation } = useRelations() as RelationsManager;

	const onUpdateTicket = ({ ticket, datetimeIds, priceIds }: TicketMutationCallbackFnArgs): void => {
		if (ticket.id && datetimeIds.length) {
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

		if (ticket.id && priceIds.length) {
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
		}
	};

	return onUpdateTicket;
};

export default useOnUpdateTicket;
